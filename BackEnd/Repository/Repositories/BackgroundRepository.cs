using Domain.Entities;
using Repository.Interfaces;

namespace Repository.Repositories
{
    public class BackgroundRepository : GenericRepository<Background>, IBackgroundRepository
    {
        private readonly CapyLofiDbContext _context;
        private readonly ICurrentTime _timeService;
        private readonly IClaimsService _claimsService;
        public BackgroundRepository(CapyLofiDbContext context, ICurrentTime timeService, IClaimsService claimsService) : base(context, timeService, claimsService)
        {
            _context = context;
            _timeService = timeService;
            _claimsService = claimsService;
        }
    }
}
