using Microsoft.AspNetCore.Identity;
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
    public class UserEntity : IdentityUser
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public ICollection<OrderEntity> Orders { get; set; } = [];
        public ICollection<NotificationEntity> Notifications { get; set; } = [];
        public ICollection<CartEntity> Carts { get; set; } = [];
        public ICollection<CommentEntity> Comments { get; set; } = [];
    }
}
