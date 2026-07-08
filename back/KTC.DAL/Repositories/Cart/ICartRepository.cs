using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.Cart
{
    public interface ICartRepository
        : IGenericRepository<CartEntity>
    {
        Task<CartEntity?> GetUserCartAsync(string userId);
    }
}
