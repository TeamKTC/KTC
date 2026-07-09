using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.OrderItem
{
    public class OrderItemRepository : GenericRepository<OrderItemEntity>, IOrderItemRepository
    {
        public OrderItemRepository(AppDbContext context) : base(context){}

        public Task<List<OrderItemEntity>> GetOrdersItemsByOrderId(string orderId)
        {
            return _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();
        }

        public Task<List<OrderItemEntity>> GetOrdersItemsByProductId(string productId)
        {
            return _context.OrderItems
                .Where(oi => oi.ProductId == productId)
                .ToListAsync();
        }
    }
}
