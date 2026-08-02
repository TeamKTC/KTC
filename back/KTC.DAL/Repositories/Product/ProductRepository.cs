using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Product
{
    public class ProductRepository : GenericRepository<ProductEntity>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context) { }

        public Task<List<CommentEntity>> GetAllComments()
        {
            return _context.Set<CommentEntity>().ToListAsync();
        }

        public Task<List<ProductEntity>> GetByCategory(string CatagoryId)
        {
            return _context.Set<ProductEntity>().Where(p => p.CategoryId == CatagoryId).ToListAsync();
        }

        public Task<List<ProductEntity>> GetByName(string name)
        {
            return _context.Set<ProductEntity>().Where(p => p.Name.Contains(name)).ToListAsync();
        }

        public Task<List<ProductEntity>> GetByPriceRange(int min, int max)
        {
            return _context.Set<ProductEntity>().Where(p => p.Price >= min && p.Price <= max).ToListAsync();
        }

        public Task<List<ProductEntity>> WithHitghestMothsPerSold()
        {
            return _context.Set<ProductEntity>().OrderByDescending(p => p.SoldPerMonth).Take(6).ToListAsync();
        }

        public Task<List<ProductEntity>> WithHitghsRate()
        {
            return _context.Set<ProductEntity>().OrderByDescending(p => p.Rate).Take(6).ToListAsync();
        }
    }
}
