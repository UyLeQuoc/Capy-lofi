using System.Security.Claims;

namespace Service.Interfaces;

public interface ITokenGenerators
{
    (string accessToken, string refreshToken) GenerateTokens(List<Claim> claims);
    bool ValidateRefreshToken(string token);
}