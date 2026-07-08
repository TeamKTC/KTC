using KTC.BLL.Dto.CartItem;

namespace KTC.BLL.Services.CartItem
{
    public interface ICartItemService
    {
        Task<CartItemDto?> GetByIdAsync(string id);
        Task CreateAsync(CartItemDto dto);
        Task UpdateAsync(CartItemDto dto);
        Task DeleteAsync(string id);
        Task DeleteByCartIdAsync(string cartId);
    }
}