using KTC.BLL.Services;

namespace KTC.BLL.Services.Favorite
{
    public interface IFavoriteService
    {
        Task<ServiceResponse> AddAsync(string userId, string productId);
        Task<ServiceResponse> RemoveAsync(string userId, string productId);
        Task<ServiceResponse> GetAllAsync(string userId);
    }
}