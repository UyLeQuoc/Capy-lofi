using Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Entities;

namespace Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(CapyLofiDbContext context, ICurrentTime timeService, IClaimsService claimsService)
            : base(context, timeService, claimsService)
        {
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task RegisterUser(User user)
        {
            await AddAsync(user);
        }
    }
}