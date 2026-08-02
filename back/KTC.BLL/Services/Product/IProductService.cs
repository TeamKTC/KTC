using KTC.BLL.Dto.Product;

namespace KTC.BLL.Services.Product
{
    public interface IProductService
    {
        Task<ServiceResponse> CreateAsync(CreateProductDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateProductDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetProductById(string productId);
        Task<ServiceResponse> GetAllProducts();
        Task<ServiceResponse> GetProductByName(string productName);
        Task<ServiceResponse> GetProductByPriceRange(int min, int max);
        Task<ServiceResponse> WithHitghestRate();
        Task<ServiceResponse> WithHitghestMothsPerSold();
    }
}
