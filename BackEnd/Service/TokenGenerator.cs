using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.Interfaces;

namespace Service;

public class TokenGenerators
{
    private readonly IConfiguration _configuration;

    public TokenGenerators(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public (string accessToken, string refreshToken) GenerateTokens(IEnumerable<Claim>? claims = null)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");

        // Validate and log configuration values
        var accessTokenSecret = jwtSettings["SecretKey"];
        var refreshTokenSecret = jwtSettings["SecretKey"]; // Assuming the same secret key is used for refresh tokens
        var issuer = jwtSettings["Issuer"];
        var audience = jwtSettings["Audience"];
        var accessTokenExpirationMinutes = jwtSettings["AccessTokenExpirationMinutes"];
        var refreshTokenExpirationMinutes = jwtSettings["RefreshTokenExpirationMinutes"];

        if (string.IsNullOrEmpty(accessTokenSecret) || string.IsNullOrEmpty(refreshTokenSecret) ||
            string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(audience) ||
            string.IsNullOrEmpty(accessTokenExpirationMinutes) || string.IsNullOrEmpty(refreshTokenExpirationMinutes))
        {
            throw new ArgumentNullException("One or more configuration values are null or empty.");
        }

        Console.WriteLine($"AccessTokenSecret: {accessTokenSecret}");
        Console.WriteLine($"RefreshTokenSecret: {refreshTokenSecret}");
        Console.WriteLine($"Issuer: {issuer}");
        Console.WriteLine($"Audience: {audience}");
        Console.WriteLine($"AccessTokenExpirationMinutes: {accessTokenExpirationMinutes}");
        Console.WriteLine($"RefreshTokenExpirationMinutes: {refreshTokenExpirationMinutes}");

        var accessToken = GenerateToken(
            accessTokenSecret,
            issuer,
            audience,
            double.Parse(accessTokenExpirationMinutes),
            claims
        );

        var refreshToken = GenerateToken(
            refreshTokenSecret,
            issuer,
            audience,
            double.Parse(refreshTokenExpirationMinutes),
            claims
        );

        return (accessToken, refreshToken);
    }

    private string GenerateToken(string secretKey, string issuer, string audience, double expirationMinutes, IEnumerable<Claim>? claims = null)
    {
        SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        SigningCredentials credentials = new(key, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new(
            issuer,
            audience,
            claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateRefreshToken(string refreshToken)
    {
        TokenValidationParameters validationParameters = new()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])),
            ValidIssuer = _configuration["JwtSettings:Issuer"],
            ValidAudience = _configuration["JwtSettings:Audience"],
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ClockSkew = TimeSpan.Zero,
        };

        JwtSecurityTokenHandler tokenHandler = new();
        try
        {
            tokenHandler.ValidateToken(refreshToken, validationParameters, out SecurityToken validatedToken);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
