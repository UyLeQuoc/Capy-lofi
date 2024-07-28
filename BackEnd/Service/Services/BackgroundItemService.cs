using Domain.Entities;
using Repository.Interfaces;
using Service.Interfaces;

namespace Service.Services
{
    public class BackgroundItemService : IBackgroundItemService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BackgroundItemService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Background>> GetAllBackgroundsAsync()
        {
            return await _unitOfWork.BackgroundRepository.GetAllAsync();
        }

        public async Task<Background> GetBackgroundByIdAsync(int id)
        {
            //Find the background by id
            var background = await _unitOfWork.BackgroundRepository.GetByIdAsync(id);
            if (background == null)
            {
                throw new Exception("Background " + id + " not found");
            }
            return background;
        }

        public async Task<Background> CreateBackgroundAsync(Background background)
        {
            await _unitOfWork.BackgroundRepository.AddAsync(background);
            await _unitOfWork.SaveChangeAsync();
            return background;
        }

        public async Task<Background> UpdateBackgroundAsync(Background createBackground)
        {
            //Find the background by id
            var background = await _unitOfWork.BackgroundRepository.GetByIdAsync(createBackground.Id);
            if (background == null)
            {
                throw new Exception("Background " + createBackground.Id + " not found");
            }
            //Update the background
            background.Name = createBackground.Name;
            background.Description = createBackground.Description;
            background.BackgroundUrl = createBackground.BackgroundUrl;
            background.Size = createBackground.Size;
            background.Price = createBackground.Price;
            background.Status = createBackground.Status;

            await _unitOfWork.BackgroundRepository.Update(background);
            await _unitOfWork.SaveChangeAsync();
            return background;
        }

        public async Task DeleteBackgroundAsync(int id)
        {
            //Find the background by id
            var background = await _unitOfWork.BackgroundRepository.GetByIdAsync(id);
            if (background == null)
            {
                throw new Exception("Background " + id + " not found");
            }
            //Remove the background
            await _unitOfWork.BackgroundRepository.SoftRemove(background);
            await _unitOfWork.SaveChangeAsync();
        }

    }
}
