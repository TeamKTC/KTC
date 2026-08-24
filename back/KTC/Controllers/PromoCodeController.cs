using KTC.BLL.Dto.PromoCode;
using KTC.BLL.Services.PromoCode;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/promocode")]
    public class PromoCodeController : ControllerBase
    {
        private readonly IPromoCodeService _promoCodeService;

        public PromoCodeController(
            IPromoCodeService promoCodeService)
        {
            _promoCodeService = promoCodeService;
        }

        [Authorize]
        [HttpPost("validate")]
        public async Task<IActionResult> Validate(
            [FromBody] ValidatePromoCodeDto dto)
        {
            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var response =
                await _promoCodeService.ValidateAsync(
                    dto,
                    userId);

            return this.ToActionResult(response);
        }
    }
}   