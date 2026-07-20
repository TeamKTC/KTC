using KTC.BLL.Dto.AttributeDefinition;

namespace KTC.BLL.Services.AttributeDefinition
{
    public interface IAttibuteDefinitionService
    {
        Task<ServiceResponse> CreateAsync(CreateAttributeDefinitionDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateAttributeDefinitionDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetAttributeDefinitionById(string attributeDefinitionId);
        Task<ServiceResponse> GetAllAtributeDefinitions();
        Task<ServiceResponse> GetByName(string name);
        Task<ServiceResponse> GetByProductId(string productId);
        Task<ServiceResponse> GetByType(string type);
        Task<ServiceResponse> IsAttributeDefinitionIntegers(string attributeDefinitionId);


    }
}
