using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.Cart
{
    public class CartRepository
        : GenericRepository<CartEntity>, ICartRepository
    {
        public CartRepository(AppDbContext context)
            : base(context)
        {

        }
        public async Task<CartEntity?> GetUserCartAsync(string userId)
        {
            return await _context.Carts
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }
}




