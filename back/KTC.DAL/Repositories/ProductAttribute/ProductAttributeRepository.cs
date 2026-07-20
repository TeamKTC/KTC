using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.ProductAttribute
{
    public class ProductAttributeRepository : GenericRepository<ProductAttributeEntity>, IProductAttributeRepository
    {
        public ProductAttributeRepository(AppDbContext context) : base(context){}
        public async Task<List<ProductAttributeEntity>> GetByProductId(string productId)
        {
            return await _context.ProductAttributes
                .Where(pa => pa.ProductId == productId)
                .ToListAsync();
        }
        public async Task<List<ProductAttributeEntity>> GetByAttributeDefinitionId(string attributeDefinitionId)
        {
            return await _context.ProductAttributes
                .Where(pa => pa.AttributeDefinitionId == attributeDefinitionId)
                .ToListAsync();
        }
        public async Task<List<ProductEntity>> GetByRangeOfValue(string attributeDefinitionId, int min, int max)
        {
            return (await _context.ProductAttributes
                .Where(pa => pa.AttributeDefinitionId == attributeDefinitionId)
                .Include(pa => pa.Product)
                .ToListAsync())
                .Where(pa => int.TryParse(pa.Value, out var value) &&
                             value >= min &&
                             value <= max)
                .Select(pa => pa.Product)
                .Distinct()
                .ToList();
        }
    }
}
