using Domain.Entities;

namespace Repository.Interfaces;
public interface IAuthRepository
{
    Task UpdateRefreshToken(int userId, string refreshToken);
    Task<User> GetRefreshToken(string token);
}