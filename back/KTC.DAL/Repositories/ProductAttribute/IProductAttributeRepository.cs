using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.ProductAttribute
{
    public interface IProductAttributeRepository : IGenericRepository<ProductAttributeEntity>
    {
        Task<List<ProductAttributeEntity>> GetByProductId(string productId);
        Task<List<ProductAttributeEntity>> GetByAttributeDefinitionId(string attributeDefinitionId);
        Task<List<ProductEntity>> GetByRangeOfValue(string attributeDefinitionId, int min, int max);
        Task<List<ProductEntity>> GetByStringValue(string attributeDefinitionId, string value);

    }
}
