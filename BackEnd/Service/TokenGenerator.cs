using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service.Interfaces;

namespace Service;

public class TokenGenerators : ITokenGenerators
{
    private readonly IConfiguration _configuration;

    public TokenGenerators(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public (string accessToken, string refreshToken) GenerateTokens(List<Claim> claims)
    {
        // Generate access token
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30), 
            signingCredentials: creds
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

        // Generate refresh token
        var refreshToken = Guid.NewGuid().ToString();

        return (accessToken, refreshToken);
    }

    public bool ValidateRefreshToken(string token)
    {
        return Guid.TryParse(token, out _);
    }
}