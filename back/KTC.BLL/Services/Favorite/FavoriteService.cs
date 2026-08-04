using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.Favorite
{
    using AutoMapper;
    using KTC.BLL.Dto.Favorite;
    using KTC.DAL.Entities;
    using KTC.DAL.Repositories.Interfaces;

    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IMapper _mapper;

        public FavoriteService(
            IFavoriteRepository favoriteRepository,
            IMapper mapper)
        {
            _favoriteRepository = favoriteRepository;
            _mapper = mapper;
        }

        public async Task AddAsync(string userId, string productId)
        {
            var favorite = await _favoriteRepository.GetAsync(userId, productId);

            if (favorite != null)
                return;

            await _favoriteRepository.CreateAsync(new FavoriteEntity
            {
                UserId = userId,
                ProductId = productId
            });
        }

        public async Task RemoveAsync(string userId, string productId)
        {
            var favorite = await _favoriteRepository.GetAsync(userId, productId);

            if (favorite == null)
                return;

            await _favoriteRepository.DeleteAsync(favorite);
        }

        public async Task<List<FavoriteDto>> GetAllAsync(string userId)
        {
            var favorites = await _favoriteRepository.GetByUserIdAsync(userId);

            return _mapper.Map<List<FavoriteDto>>(favorites);
        }
    }
}
