
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories
{
    public class FavoriteRepository : GenericRepository<FavoriteEntity>, IFavoriteRepository
    {
        public FavoriteRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<FavoriteEntity?> GetAsync(string userId, string productId)
        {
            return await _context.Favorites
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == productId);
        }

        public async Task<List<FavoriteEntity>> GetByUserIdAsync(string userId)
        {
            return await _context.Favorites
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }
    }
}