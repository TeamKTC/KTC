using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Brand
{
    public class BrandRepository : GenericRepository<BrandEntity>, IBrandRepository
    {
        public BrandRepository(AppDbContext context) : base(context){}

        public async Task<List<ProductEntity>> GetAllProductsAsync(string brandId)
        {
            return await _context.Set<ProductEntity>().Where(p => p.BrandId == brandId).ToListAsync();
        }
    }
}
