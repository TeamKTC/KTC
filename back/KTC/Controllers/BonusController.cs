using KTC.BLL.Services.Bonus;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BonusController : ControllerBase
    {
        private readonly IBonusService _bonusService;

        public BonusController(IBonusService bonusService)
        {
            _bonusService = bonusService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetHistory()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var result = await _bonusService.GetUserBonuses(userId);

            return StatusCode((int)result.StatusCode, result);
        }

        [Authorize]
        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var result = await _bonusService.GetBonusBalance(userId);

            return StatusCode((int)result.StatusCode, result);
        }
    }
}