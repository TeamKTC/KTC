using KTC.BLL.Dto.Category;

namespace KTC.BLL.Services.Catagory
{
    public interface ICategoryService
    {
        Task<ServiceResponse> CreateAsync(CreateCategoryDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateCategoryDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetCategoryByName(string categoryName);
        Task<ServiceResponse> GetCategoryById(string categoryId);
        Task<ServiceResponse> GetAllCategories();
        Task<ServiceResponse> GetProductsByCategoryName(string name);
    }
}
