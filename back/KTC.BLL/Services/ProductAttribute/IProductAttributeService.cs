using KTC.BLL.Dto.ProductAttribute;

namespace KTC.BLL.Services.ProductAttribute
{
    public interface IProductAttributeService
    {
        Task<ServiceResponse> CreateAsync(CreateProductAttributeDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateProductAttributeDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetProductAttributeById(string productAttributeId);
        Task<ServiceResponse> GetAllAtributes();
        Task<ServiceResponse> GetByProductId(string productId);
        Task<ServiceResponse> GetByAttributeDefinitionId(string attributeDefinitionId);
        Task<ServiceResponse> GetByRangeOfValue(string attributeDefinitionId, int min, int max);
        Task<ServiceResponse> GetByStringValue(string attributeDefinitionId, string value);
    }
}
