using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Order
{
    public interface IOrderRepository : IGenericRepository<OrderEntity>
    {
        Task<List<OrderEntity>> GetOrdersByUserId(string userId);
        Task<List<OrderItemEntity>> GetOrderItemsByOrderId(string orderId);
    }
}
