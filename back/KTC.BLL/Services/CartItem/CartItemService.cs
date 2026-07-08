using AutoMapper;
using KTC.BLL.Dto.CartItem;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.CartItem;

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
        public async Task<CartItemDto?> GetByIdAsync(string id)
        {
            var item = await _repository.GetByIdAsync(id);

            return _mapper.Map<CartItemDto?>(item);
        }
        public async Task CreateAsync(CartItemDto dto)
        {
            var item = _mapper.Map<CartItemEntity>(dto);

            await _repository.CreateAsync(item);
        }
        public async Task UpdateAsync(CartItemDto dto)
        {
            var item = _mapper.Map<CartItemEntity>(dto);

            await _repository.UpdateAsync(item);
        }
        public async Task DeleteAsync(string id)
        {
            var item = await _repository.GetByIdAsync(id);

            if (item == null)
                return;

            await _repository.DeleteAsync(item);
        }
        public async Task DeleteByCartIdAsync(string cartId)
        {
            await _repository.DeleteByCartIdAsync(cartId);
        }
    }
}