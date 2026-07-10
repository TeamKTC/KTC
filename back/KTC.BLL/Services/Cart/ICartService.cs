using KTC.BLL.Dto.Cart;


namespace KTC.BLL.Services.Cart
{
    public interface ICartService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetUserCartAsync(string userId);
        Task<ServiceResponse> CreateAsync(CartDto dto);
        Task<ServiceResponse> UpdateAsync(CartDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
    }
}