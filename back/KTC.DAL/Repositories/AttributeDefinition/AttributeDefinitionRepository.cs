using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.AttributeDefinition
{
    public class AttributeDefinitionRepository : GenericRepository<AttributeDefinitionEntity>, IAttributeDefinitionRepository
    {
        public AttributeDefinitionRepository(AppDbContext context) : base(context){}

        public async Task<AttributeDefinitionEntity> GetByName(string name)
        {
            return await _context.Set<AttributeDefinitionEntity>().FirstOrDefaultAsync(a => a.Name == name);
        }

        public async Task<List<AttributeDefinitionEntity>> GetByProductId(string productId)
        {
            return await _context.Set<AttributeDefinitionEntity>()
                .Where(a => a.ProductAttributes.Any(pa => pa.ProductId == productId))
                .ToListAsync();
        }
        public async Task<List<AttributeDefinitionEntity>> GetByType(string type)
        {
            return await _context.Set<AttributeDefinitionEntity>()
                .Where(a => a.Type == type)
                .ToListAsync();
        }

        public Task<bool> IsAttributeDefinitionIntegers(string attributeDefinitionId)
        {
            return _context.Set<AttributeDefinitionEntity>()
                .AnyAsync(a => a.Id == attributeDefinitionId && a.Type == "integer");
        }
    }
}
