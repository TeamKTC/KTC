using AutoMapper;
using KTC.BLL.Dto.Cart;
using KTC.BLL.Services.Cart;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Cart;
using System.Net;

namespace KTC.BLL.Services.Cart
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _repository;
        private readonly IMapper _mapper;

        public CartService(
            ICartRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var cart = await _repository.GetByIdAsync(id);

            if (cart == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Cart not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<CartDto>(cart),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetUserCartAsync(string userId)
        {
            var cart = await _repository.GetUserCartAsync(userId);

            if (cart == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Cart not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<CartDto>(cart),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> CreateAsync(CartDto dto)
        {
            var cart = _mapper.Map<CartEntity>(dto);

            await _repository.CreateAsync(cart);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart created",
                StatusCode = HttpStatusCode.Created
            };
        }

        public async Task<ServiceResponse> UpdateAsync(CartDto dto)
        {
            var cart = _mapper.Map<CartEntity>(dto);

            await _repository.UpdateAsync(cart);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart updated",
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var cart = await _repository.GetByIdAsync(id);

            if (cart == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Cart not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            await _repository.DeleteAsync(cart);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart deleted",
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}