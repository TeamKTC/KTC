using KTC.BLL.Dto.Notification;
using KTC.BLL.Services.Notification;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationController(INotificationService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var response = await _service.GetByIdAsync(id);
            return this.ToActionResult(response);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserNotifications(string userId)
        {
            var response = await _service.GetUserNotificationsAsync(userId);
            return this.ToActionResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create(NotificationDto dto)
        {
            var response = await _service.CreateAsync(dto);
            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update(NotificationDto dto)
        {
            var response = await _service.UpdateAsync(dto);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var response = await _service.DeleteAsync(id);
            return this.ToActionResult(response);
        }

        [HttpPut("mark-as-read/{id}")]
        public async Task<IActionResult> MarkAsRead(string id)
        {
            var response = await _service.MarkAsReadAsync(id);
            return this.ToActionResult(response);
        }
    }
}