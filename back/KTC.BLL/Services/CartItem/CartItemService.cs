using AutoMapper;
using KTC.BLL.Dto.CartItem;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.CartItem;
using System.Net;

namespace KTC.BLL.Services.CartItem
{
    public class CartItemService : ICartItemService
    {
        private readonly ICartItemRepository _repository;
        private readonly IMapper _mapper;
        public CartItemService(
            ICartItemRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var item = await _repository.GetByIdAsync(id);

            if (item == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Cart item not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<CartItemDto>(item),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> CreateAsync(CartItemDto dto)
        {
            var item = _mapper.Map<CartItemEntity>(dto);

            await _repository.CreateAsync(item);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart item created",
                StatusCode = HttpStatusCode.Created
            };
        }

        public async Task<ServiceResponse> UpdateAsync(CartItemDto dto)
        {
            var item = _mapper.Map<CartItemEntity>(dto);

            await _repository.UpdateAsync(item);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart item updated",
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var item = await _repository.GetByIdAsync(id);

            if (item == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Cart item not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            await _repository.DeleteAsync(item);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart item deleted",
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> DeleteByCartIdAsync(string cartId)
        {
            await _repository.DeleteByCartIdAsync(cartId);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Cart items deleted",
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}