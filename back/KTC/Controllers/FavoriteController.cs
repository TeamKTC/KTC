using KTC.BLL.Services.Favorite;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/favorite")]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var response = await _favoriteService.GetAllAsync(userId);

            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromQuery] string productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var response = await _favoriteService.AddAsync(userId, productId);

            return this.ToActionResult(response);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFavorite([FromQuery] string productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var response = await _favoriteService.RemoveAsync(userId, productId);

            return this.ToActionResult(response);
        }
    }
}