using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.AttributeDefinition
{
    public interface IAttributeDefinitionRepository : IGenericRepository<AttributeDefinitionEntity>
    {
         Task<AttributeDefinitionEntity> GetByName(string name);
         Task<List<AttributeDefinitionEntity>> GetByProductId(string productId);
        Task<List<AttributeDefinitionEntity>> GetByType(string type);
        Task<Boolean> IsAttributeDefinitionIntegers(string attributeDefinitionId);
    }
}
