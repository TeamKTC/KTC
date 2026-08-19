using KTC.BLL.Dto.Auth;
using KTC.BLL.Services;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var response = await _authService.Register(dto);
            return this.ToActionResult(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var response = await _authService.Login(dto);
            return this.ToActionResult(response);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(
            string email,
            string token)
        {
            var response = await _authService.ConfirmEmail(email, token);
            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("send-confirmation-email")]
        public async Task<IActionResult> SendConfirmationEmail()
        {
            Console.WriteLine("AUTHORIZE PASSED");

            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"{claim.Type}: {claim.Value}");
            }

            var response = await _authService.SendConfirmationEmail(User);

            return this.ToActionResult(response);
        }

        [HttpPost("verify-2fa")]
        public async Task<IActionResult> VerifyTwoFactor(
            VerifyTwoFactorDto dto)
        {
            var response = await _authService.VerifyTwoFactor(dto);

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("enable-2fa")]
        public async Task<IActionResult> EnableTwoFactor()
        {
            var response = await _authService.EnableTwoFactor(User);

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("confirm-enable-2fa")]
        public async Task<IActionResult> ConfirmEnableTwoFactor(
            [FromBody] TwoFactorCodeDto dto)
        {
            var response = await _authService.ConfirmEnableTwoFactor(
                User,
                dto.Code
            );

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("disable-2fa")]
        public async Task<IActionResult> DisableTwoFactor()
        {
            var response = await _authService.DisableTwoFactor(User);

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("confirm-disable-2fa")]
        public async Task<IActionResult> ConfirmDisableTwoFactor(
            [FromBody] TwoFactorCodeDto dto)
        {
            var response = await _authService.ConfirmDisableTwoFactor(
                User,
                dto.Code
            );

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(
        [FromBody] ChangePasswordDto dto)
        {
            var response = await _authService.ChangePassword(
                User,
                dto
            );

            return this.ToActionResult(response);
        }


    }
}