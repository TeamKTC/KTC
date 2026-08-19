using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Bonus
{
    public class BonusRepository : GenericRepository<BonusEntity>, IBonusRepository
    {
        public BonusRepository(AppDbContext context) : base(context)
        {
        }

        public Task<List<BonusEntity>> GetByUserIdAsync(string userId)
        {
            return _context.Bonuses
                .Include(x => x.Order)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
        }
    }
}