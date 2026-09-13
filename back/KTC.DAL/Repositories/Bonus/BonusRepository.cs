using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Bonus
{
    public class BonusRepository : GenericRepository<BonusEntity>, IBonusRepository
    {
        public BonusRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<BonusEntity>> GetByUserIdAsync(string userId)
        {
            return await _context.Bonuses
                .Include(x => x.Order)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
        }

        public async Task<List<BonusEntity>> GetLast10ByUserIdAsync(string userId)
        {
            return await _context.Bonuses
                .Include(x => x.Order)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .Take(10)
                .ToListAsync();
        }

        public async Task AddAsync(BonusEntity entity)
        {
            await _context.Bonuses.AddAsync(entity);
        }
    }
}