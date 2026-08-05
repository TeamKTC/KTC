using KTC.BLL.Interfaces;
using KTC.BLL.Services.Favorite;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var favorites = await _favoriteService.GetAllAsync(userId);

            return Ok(favorites);
        }

        [HttpPost("{productId}")]
        public async Task<IActionResult> Add(string productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            await _favoriteService.AddAsync(userId, productId);

            return NoContent();
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> Remove(string productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            await _favoriteService.RemoveAsync(userId, productId);

            return NoContent();
        }
    }
}