using KTC.BLL.Dto.Cart;


namespace KTC.BLL.Services.Cart
{
    public interface ICartService
    {
        Task<CartDto?> GetByIdAsync(string id);

        Task<CartDto?> GetUserCartAsync(string userId);

        Task CreateAsync(CartDto dto);

        Task UpdateAsync(CartDto dto);

        Task DeleteAsync(string id);
    }
}