using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Service.Interfaces;
using System.Security.Claims;
using Domain.DTOs.Response;
using Domain.Entities;
using Newtonsoft.Json.Linq;
using Repository.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace Service
{
    public class GoogleAuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepository;
        private readonly ITokenGenerators _tokenGenerators;

        public GoogleAuthenticationService(IConfiguration configuration, HttpClient httpClient, IUserRepository userRepository, IAuthRepository authRepository, ITokenGenerators tokenGenerators)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _userRepository = userRepository;
            _authRepository = authRepository;
            _tokenGenerators = tokenGenerators;
        }

        public Task<string> GetGoogleLoginUrlAsync()
        {
            try
            {
                var clientId = _configuration["Authentication:Google:ClientId"];
                var redirectUri = "http://localhost:5278/api/auth/google-callback"; // Ensure this matches the Google API Console
                var loginUrl = $"https://accounts.google.com/o/oauth2/auth?client_id={clientId}&redirect_uri={redirectUri}&response_type=code&scope=openid%20email%20profile";
                return Task.FromResult(loginUrl);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to generate Google login URL.", ex);
            }
        }


        public async Task<Authenticator> HandleGoogleCallbackAsync(string code)
        {
            try
            {
                string clientId = _configuration["Authentication:Google:ClientId"];
                string clientSecret = _configuration["Authentication:Google:ClientSecret"];
                string redirectUri = "http://localhost:5278/api/auth/google-callback"; // Ensure this matches the Google API Console

                var tokenResponse = await ExchangeCodeForTokensAsync(code, clientId, clientSecret, redirectUri);
                var payload = await ValidateIdTokenAsync(tokenResponse.IdToken);

                var user = await _userRepository.GetUserByEmail(payload.Email);
                if (user == null)
                {
                    user = new User { Email = payload.Email }; // Assuming a default verified status
                    await _userRepository.RegisterUser(user);
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                };

                var (accessToken, refreshToken) = _tokenGenerators.GenerateTokens(claims);
                await _authRepository.UpdateRefreshToken(user.Id, refreshToken);

                return new Authenticator
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to handle Google callback.", ex);
            }
        }

        private async Task<TokenResponse> ExchangeCodeForTokensAsync(string code, string clientId, string clientSecret, string redirectUri)
        {
            try
            {
                var requestUrl = "https://oauth2.googleapis.com/token";
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("client_id", clientId),
                    new KeyValuePair<string, string>("client_secret", clientSecret),
                    new KeyValuePair<string, string>("redirect_uri", redirectUri), // Ensure this matches the Google API Console
                    new KeyValuePair<string, string>("grant_type", "authorization_code")
                });

                var response = await _httpClient.PostAsync(requestUrl, content);
                response.EnsureSuccessStatusCode();

                var responseString = await response.Content.ReadAsStringAsync();
                return JObject.Parse(responseString).ToObject<TokenResponse>();
            }
            catch (HttpRequestException httpEx)
            {
                throw new ApplicationException("Failed to exchange authorization code for tokens.", httpEx);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unexpected error occurred while exchanging authorization code for tokens.", ex);
            }
        }

        private async Task<GoogleJsonWebSignature.Payload> ValidateIdTokenAsync(string idToken)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _configuration["Authentication:Google:ClientId"] }
                };
                return await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            }
            catch (InvalidJwtException jwtEx)
            {
                throw new ApplicationException("Invalid ID token.", jwtEx);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unexpected error occurred while validating ID token.", ex);
            }
        }
    }

    
}
