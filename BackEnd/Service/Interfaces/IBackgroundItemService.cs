using Domain.Entities;

namespace Service.Interfaces
{
    public interface IBackgroundItemService
    {
        Task<List<Background>> GetAllBackgroundsAsync();
        Task<Background> GetBackgroundByIdAsync(int id);
        Task<Background> CreateBackgroundAsync(Background background);
        Task<Background> UpdateBackgroundAsync(Background background);
        Task DeleteBackgroundAsync(int id);
    }
}
