namespace Repository.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IBackgroundRepository BackgroundRepository { get; }
        IMusicRepository MusicRepository { get; }
        Task<int> SaveChangeAsync();
    }
}
