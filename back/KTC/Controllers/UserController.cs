using KTC.BLL.Dto.User;
using KTC.BLL.Services.User;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _service.GetAllUsersAsync();
            return this.ToActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var response = await _service.GetByIdAsync(id);
            return this.ToActionResult(response);
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var response = await _service.GetByEmailAsync(email);
            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var response = await _service.GetByIdAsync(userId);

            return this.ToActionResult(response);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            var response = await _service.SearchAsync(search);
            return this.ToActionResult(response);
        }

        [HttpGet("created-after")]
        public async Task<IActionResult> GetUsersCreatedAfter([FromQuery] DateTime date)
        {
            var response = await _service.GetUsersCreatedAfterAsync(date);
            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(
            [FromBody] UpdateProfileDto dto)
        {
            var response = await _service.UpdateProfile(
                User,
                dto
            );

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpPost("profile/confirm-email")]
        public async Task<IActionResult> ConfirmEmailChange(
    [FromBody] ConfirmEmailDto dto)
        {
            var response = await _service.ConfirmEmailChange(
                User,
                dto.Code
            );

            return this.ToActionResult(response);
        }
    }
}