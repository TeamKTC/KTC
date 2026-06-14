using Microsoft.AspNetCore.Mvc;
using KTC.BLL.Services;

namespace KTC.Extensions
{
    public static class ControllerBaseExtensions
    {
        public static IActionResult ToActionResult(this ControllerBase controller, ServiceResponse response)
        {
            return controller.StatusCode((int)response.StatusCode, response);
        }
    }
}