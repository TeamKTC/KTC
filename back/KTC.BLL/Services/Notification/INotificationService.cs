using KTC.BLL.Dto.Notification;

namespace KTC.BLL.Services.Notification
{
    public interface INotificationService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetUserNotificationsAsync(string userId);
        Task<ServiceResponse> CreateAsync(NotificationDto dto);
        Task<ServiceResponse> UpdateAsync(NotificationDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> MarkAsReadAsync(string id);
    }
}