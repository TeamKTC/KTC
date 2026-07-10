using KTC.BLL.Dto.CartItem;

namespace KTC.BLL.Services.CartItem
{
    public interface ICartItemService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> CreateAsync(CartItemDto dto);
        Task<ServiceResponse> UpdateAsync(CartItemDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> DeleteByCartIdAsync(string cartId);
    }
}