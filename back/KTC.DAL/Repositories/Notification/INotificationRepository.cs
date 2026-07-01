using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.Notification
{
    public interface INotificationRepository
        : IGenericRepository<NotificationEntity>
    {
        Task<List<NotificationEntity>> GetUserNotificationsAsync(string userId);

        Task MarkAsReadAsync(string id);
    }
}
