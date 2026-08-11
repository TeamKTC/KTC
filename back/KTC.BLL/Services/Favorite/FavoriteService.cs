using AutoMapper;
using KTC.BLL.Dto.Favorite;
using KTC.BLL.Dto.Product;
using KTC.BLL.Services;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Interfaces;
using System.Net;

namespace KTC.BLL.Services.Favorite
{
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

        public async Task<ServiceResponse> AddAsync(string userId, string productId)
        {
            var favorite = await _favoriteRepository.GetAsync(userId, productId);

            if (favorite != null)
            {
                return new ServiceResponse
                {
                    Message = "Product already in favorites"
                };
            }

            await _favoriteRepository.CreateAsync(new FavoriteEntity
            {
                UserId = userId,
                ProductId = productId
            });

            return new ServiceResponse
            {
                Message = "Product added to favorites"
            };
        }

        public async Task<ServiceResponse> RemoveAsync(string userId, string productId)
        {
            var favorite = await _favoriteRepository.GetAsync(userId, productId);

            if (favorite == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Favorite not found"
                };
            }

            await _favoriteRepository.DeleteAsync(favorite);

            return new ServiceResponse
            {
                Message = "Product removed from favorites"
            };
        }

        public async Task<ServiceResponse> GetAllAsync(string userId)
        {
            var favorites = await _favoriteRepository.GetByUserIdAsync(userId);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductDto>>(
                    favorites.Select(x => x.Product).ToList()
                )
            };
        }
    }
}