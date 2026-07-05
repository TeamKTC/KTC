using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Order
{
    public class OrderRepository: GenericRepository<OrderEntity>, IOrderRepository
    {
        public OrderRepository(AppDbContext context) : base(context){}

        public Task<List<OrderItemEntity>> GetOrderItemsByOrderId(string orderId)
        {
            return _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();
        }

        public Task<List<OrderEntity>> GetOrdersByUserId(string userId)
        {
            return _context.Orders
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }
    }
}
