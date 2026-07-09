using KTC.BLL.Dto.OrderItem;

namespace KTC.BLL.Services.OrderItem
{
    public interface IOrderItemService
    {
        Task<ServiceResponse> CreateAsync(CreateOrderItemDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateOrderItemDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetOrderItemById(string orderItemId);
        Task<ServiceResponse> GetAllOrderItems();
        Task<ServiceResponse> GetOrdersItemsByOrderId(string orderId);
        Task<ServiceResponse> GetOrdersItemsByProductId(string productId);
    }
}
