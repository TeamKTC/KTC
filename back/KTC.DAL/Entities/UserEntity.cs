using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public enum Role
    {
        User = 0,
        Admin = 1
    }
    public class UserEntity : BaseEntity
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string PasswordHash { get; set; } = default!;

        public string RoleId { get; set; } = default!;
        public Role Role { get; set; } = default!;

        public virtual ICollection<OrderEntity> Orders { get; set; } = [];
        public virtual ICollection<NotificationEntity> Notifications { get; set; } = [];
    }
}
