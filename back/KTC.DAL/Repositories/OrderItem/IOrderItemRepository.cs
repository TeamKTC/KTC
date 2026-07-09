using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.OrderItem
{
    public interface IOrderItemRepository : IGenericRepository<OrderItemEntity>
    {
        Task<List<OrderItemEntity>> GetOrdersItemsByOrderId(string orderId);
        Task<List<OrderItemEntity>> GetOrdersItemsByProductId(string productId);
    }
}
