using KTC.BLL.Services.Role;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/role")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        [HttpGet]
        public async Task<IActionResult> IsUserAdmin([FromQuery] string userId)
        {
            var response = await _roleService.IsUserAdmin(userId);
            return this.ToActionResult(response);
        }
    }
}
