using KTC.BLL.Dto.CartItem;
using KTC.BLL.Services.CartItem;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _service;

        public CartItemController(ICartItemService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var response = await _service.GetByIdAsync(id);
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CartItemDto dto)
        {
            var response = await _service.CreateAsync(dto);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update(CartItemDto dto)
        {
            var response = await _service.UpdateAsync(dto);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var response = await _service.DeleteAsync(id);
            return this.ToActionResult(response);
        }

        [HttpDelete("cart/{cartId}")]
        public async Task<IActionResult> DeleteByCartId(string cartId)
        {
            var response = await _service.DeleteByCartIdAsync(cartId);
            return this.ToActionResult(response);
        }
    }
}