using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Bonus
{
    public interface IBonusRepository : IGenericRepository<BonusEntity>
    {
        Task<List<BonusEntity>> GetByUserIdAsync(string userId);
        Task AddAsync(BonusEntity entity);
    }
}