using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Bonus
{
    public interface IBonusRepository : IGenericRepository<BonusEntity>
    {
        Task<List<BonusEntity>> GetByUserIdAsync(string userId);

        Task<List<BonusEntity>> GetLast10ByUserIdAsync(string userId);

        Task AddAsync(BonusEntity entity);
    }
}