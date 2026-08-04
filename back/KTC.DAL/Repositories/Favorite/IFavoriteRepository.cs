using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Interfaces
{
    public interface IFavoriteRepository : IGenericRepository<FavoriteEntity>
    {
        Task<FavoriteEntity?> GetAsync(string userId, string productId);
        Task<List<FavoriteEntity>> GetByUserIdAsync(string userId);
    }
}