using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class CartEntity : BaseEntity
    {
        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;

        public ICollection<CartItemEntity> Items { get; set; } = new List<CartItemEntity>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
