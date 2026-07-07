using AutoMapper;
using KTC.BLL.Dto.Cart;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Cart;
using KTC.BLL.Services.Cart;

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

        public async Task<CartDto?> GetByIdAsync(string id)
        {
            var cart = await _repository.GetByIdAsync(id);

            return _mapper.Map<CartDto?>(cart);
        }

        public async Task<CartDto?> GetUserCartAsync(string userId)
        {
            var cart = await _repository.GetUserCartAsync(userId);

            return _mapper.Map<CartDto?>(cart);
        }

        public async Task CreateAsync(CartDto dto)
        {
            var cart = _mapper.Map<CartEntity>(dto);

            await _repository.CreateAsync(cart);
        }

        public async Task UpdateAsync(CartDto dto)
        {
            var cart = _mapper.Map<CartEntity>(dto);

            await _repository.UpdateAsync(cart);
        }

        public async Task DeleteAsync(string id)
        {
            var cart = await _repository.GetByIdAsync(id);

            if (cart == null)
                return;

            await _repository.DeleteAsync(cart);
        }
    }
}