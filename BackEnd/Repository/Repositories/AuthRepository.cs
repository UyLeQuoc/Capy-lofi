using Repository.Interfaces;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CapyLofiDbContext _context;

        public AuthRepository(CapyLofiDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateUser(User user)
        {
            await _context.AddAsync(user);
            return await SaveChange();
        }

        public async Task<bool> UpdateRefreshToken(int userId, string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                user.RefreshToken = refreshToken;
                return await SaveChange();
            }
            return false;
        }

        public async Task<User> GetRefreshToken(string refreshToken)
        {
            return await _context.Users.FirstOrDefaultAsync(r => r.RefreshToken == refreshToken);
        }

        public async Task<bool> DeleteRefreshToken(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user != null)
            {
                user.RefreshToken = "";
                return await SaveChange();
            }
            return false;
        }

        public async Task<bool> SaveChange()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0;
        }
    }
}