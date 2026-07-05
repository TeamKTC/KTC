using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Category
{
    public class CategoryRepository : GenericRepository<CategoryEntity>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context){}

        public Task<CategoryEntity> GetByName(string name)
        {
            return _context.Categories.FirstOrDefaultAsync(c => c.Name == name) ?? null;
        }

        public Task<List<ProductEntity>> GetProductsByCategoryName(string name)
        {
            return _context.Products
                .Where(p => p.Category.Name == name)
                .ToListAsync();
        }
    }
}
