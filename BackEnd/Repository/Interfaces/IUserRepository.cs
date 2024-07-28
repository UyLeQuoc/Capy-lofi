using Domain.Entities;

namespace Repository.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User> GetUserByEmail(string email);
    Task RegisterUser(User user);
    Task<bool> UpdateUser(User user);
}