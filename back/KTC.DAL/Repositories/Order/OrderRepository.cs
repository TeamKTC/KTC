using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Order
{
    public class OrderRepository
        : GenericRepository<OrderEntity>, IOrderRepository
    {
        public OrderRepository(AppDbContext context)
            : base(context)
        {
        }

        public Task<List<OrderItemEntity>>
            GetOrderItemsByOrderId(string orderId)
        {
            return _context.OrderItems
                .Include(x => x.Product)
                .Where(x => x.OrderId == orderId)
                .ToListAsync();
        }

        public Task<List<OrderEntity>>
            GetOrdersByUserId(string userId)
        {
            return _context.Orders
                .Include(x => x.Items)
                    .ThenInclude(x => x.Product)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task CreateOrderWithItemsAsync(
            OrderEntity order,
            List<OrderItemEntity> items)
        {
            await using var transaction =
                await _context.Database.BeginTransactionAsync();

            try
            {
                await _context.Orders.AddAsync(order);

                await _context.OrderItems.AddRangeAsync(items);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}