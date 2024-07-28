using Domain.Entities;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service.Services
{
    public class MusicService : IMusicService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MusicService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Music>> GetAllMusicAsync()
        {
            return await _unitOfWork.MusicRepository.GetAllAsync();
        }

        public async Task<Music> GetMusicByIdAsync(int id)
        {
            var music = await _unitOfWork.MusicRepository.GetByIdAsync(id);
            if (music == null)
            {
                throw new Exception("Music " + id + " not found");
            }
            return music;
        }

        public async Task<Music> CreateMusicAsync(Music music)
        {
            await _unitOfWork.MusicRepository.AddAsync(music);
            await _unitOfWork.SaveChangeAsync();
            return music;
        }

        public async Task<Music> UpdateMusicAsync(Music updateMusic)
        {
            var music = await _unitOfWork.MusicRepository.GetByIdAsync(updateMusic.Id);
            if (music == null)
            {
                throw new Exception("Music " + updateMusic.Id + " not found");
            }

            // Update the music
            music.Name = updateMusic.Name;
            music.Description = updateMusic.Description;
            music.MusicUrl = updateMusic.MusicUrl;
            music.ThumbnailUrl = updateMusic.ThumbnailUrl;
            music.Size = updateMusic.Size;
            music.Duration = updateMusic.Duration;
            music.Price = updateMusic.Price;
            music.Status = updateMusic.Status;

            await _unitOfWork.MusicRepository.Update(music);
            await _unitOfWork.SaveChangeAsync();
            return music;
        }

        public async Task DeleteMusicAsync(int id)
        {
            var music = await _unitOfWork.MusicRepository.GetByIdAsync(id);
            if (music == null)
            {
                throw new Exception("Music " + id + " not found");
            }

            // Remove the music
            await _unitOfWork.MusicRepository.SoftRemove(music);
            await _unitOfWork.SaveChangeAsync();
        }
    }
}
