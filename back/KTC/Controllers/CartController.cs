    using KTC.BLL.Dto.Cart;
    using KTC.BLL.Services.Cart;
    using KTC.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    namespace KTC.API.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class CartController : ControllerBase
        {
            private readonly ICartService _service;

            public CartController(ICartService service)
            {
                _service = service;
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(string id)
            {
                var response = await _service.GetByIdAsync(id);
                return this.ToActionResult(response);
            }

            [HttpGet]
            [Authorize]
            public async Task<IActionResult> GetUserCart()
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var response = await _service.GetUserCartAsync(userId);

                return this.ToActionResult(response);
            }

            [HttpPost]
            public async Task<IActionResult> Create(CartDto dto)
            {
                var response = await _service.CreateAsync(dto);
                return this.ToActionResult(response);
            }

            [HttpPut]
            public async Task<IActionResult> Update(CartDto dto)
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
        }
    }