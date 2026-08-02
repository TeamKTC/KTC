

using KTC.BLL.Dto.Brand;

namespace KTC.BLL.Services.Brand
{
    public interface IBrandService
    {
        Task<ServiceResponse> CreateAsync(CreateBrandDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateBrandDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetAllBrands();
        Task<ServiceResponse> GetAllProductsByBeandId(string id);
    }
}
