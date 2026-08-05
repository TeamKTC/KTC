using KTC.BLL.Dto.Favorite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.Favorite
{
    public interface IFavoriteService
    {
        Task AddAsync(string userId, string productId);
        Task RemoveAsync(string userId, string productId);
        Task<List<FavoriteDto>> GetAllAsync(string userId);
    }
}
