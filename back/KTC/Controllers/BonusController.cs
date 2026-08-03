using KTC.BLL.Services.Bonus;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetHistory(string userId)
        {
            var result = await _bonusService.GetUserBonuses(userId);

            return StatusCode((int)result.StatusCode, result);
        }

        [HttpGet("balance/{userId}")]
        public async Task<IActionResult> GetBalance(string userId)
        {
            var result = await _bonusService.GetBonusBalance(userId);

            return StatusCode((int)result.StatusCode, result);
        }
    }
}