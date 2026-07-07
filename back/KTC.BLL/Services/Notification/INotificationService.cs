using KTC.BLL.Dto.Notification;

namespace KTC.BLL.Services.Notification
{
    public interface INotificationService
    {
        Task<NotificationDto?> GetByIdAsync(string id);

        Task<List<NotificationDto>> GetUserNotificationsAsync(string userId);

        Task CreateAsync(NotificationDto dto);

        Task UpdateAsync(NotificationDto dto);

        Task DeleteAsync(string id);

        Task MarkAsReadAsync(string id);
    }
}