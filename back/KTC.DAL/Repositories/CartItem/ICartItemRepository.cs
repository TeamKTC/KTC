using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.CartItem
{
    public interface ICartItemRepository
        : IGenericRepository<CartItemEntity>
    {
        Task DeleteByCartIdAsync(string cartId);
    }
}
