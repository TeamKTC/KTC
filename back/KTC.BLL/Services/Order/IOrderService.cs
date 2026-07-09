using KTC.BLL.Dto.Order;

namespace KTC.BLL.Services.Order
{
    public interface IOrderService
    {
        Task<ServiceResponse> CreateAsync(CreateOrderDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateOrderDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetOrderById(string orderId);
        Task<ServiceResponse> GetAllOrders();
        Task<ServiceResponse> GetOrdersByUserId(string userId);
        Task<ServiceResponse> GetOrderItemsByOrderId(string orderId);
    }
}
