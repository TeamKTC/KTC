using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace KTC.DAL.Repositories.Notification
{
    public class NotificationRepository
        : GenericRepository<NotificationEntity>, INotificationRepository
    {




        public NotificationRepository(AppDbContext context)
            : base(context)
        {

        }



        public async Task<List<NotificationEntity>> GetUserNotificationsAsync(
            string userId)
        {
            return await _context.Notifications
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
        }



        public async Task MarkAsReadAsync(string id)
        {
            var notification = await GetByIdAsync(id);

            if (notification == null)
                return;


            notification.IsRead = true;

            await UpdateAsync(notification);
        }
    }
}
