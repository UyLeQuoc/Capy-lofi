using Repository.Interfaces;

namespace Repository
{
    public class UnitOFWork : IUnitOfWork
    {
        private readonly CapyLofiDbContext _context;
        private IUserRepository _userRepository;
        private IBackgroundRepository _backgroundRepository;
        private IMusicRepository _musicRepository;

        public UnitOFWork(CapyLofiDbContext context, IUserRepository userRepository, IBackgroundRepository backgroundRepository, IMusicRepository musicRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _backgroundRepository = backgroundRepository;
            _musicRepository = musicRepository;
        }
        public IUserRepository UserRepository => _userRepository;
        public IBackgroundRepository BackgroundRepository => _backgroundRepository;
        public IMusicRepository MusicRepository => _musicRepository;
        public Task<int> SaveChangeAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
