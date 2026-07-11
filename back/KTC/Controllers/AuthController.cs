using KTC.BLL.Dto.Auth;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> ConfirmEmail(string email, string token)
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
    }
}
