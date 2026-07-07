using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.CartItem
{
    public class CartItemRepository
        : GenericRepository<CartItemEntity>, ICartItemRepository
    {

        public CartItemRepository(AppDbContext context)
            : base(context)
        {

        }

        public async Task DeleteByCartIdAsync(string cartId)
        {
            var items = await _context.CartItems
                .Where(x => x.CartId == cartId)
                .ToListAsync();


            _context.CartItems.RemoveRange(items);

            await _context.SaveChangesAsync();
        }
    }
}
