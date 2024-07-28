using Repository.Interfaces;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CapyLofiDbContext _dbContext;

        public AuthRepository(CapyLofiDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task UpdateRefreshToken(int userId, string refreshToken)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user != null)
            {
                user.RefreshToken = refreshToken;
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<User> GetRefreshToken(string token)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.RefreshToken == token);
        }
    }
}