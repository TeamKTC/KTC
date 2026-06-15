using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class NotificationEntity : BaseEntity
    {
        public string Message { get; set; } = default!;
        public bool IsRead { get; set; }

        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;
    }
}
