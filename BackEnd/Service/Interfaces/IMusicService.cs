using Domain.Entities;

namespace Service.Interfaces
{
    public interface IMusicService
    {
        Task<List<Music>> GetAllMusicAsync();
        Task<Music> GetMusicByIdAsync(int id);
        Task<Music> CreateMusicAsync(Music music);
        Task<Music> UpdateMusicAsync(Music music);
        Task DeleteMusicAsync(int id);
    }
}
