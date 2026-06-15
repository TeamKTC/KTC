using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class OrderEntity : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Status { get; set; } = default!;

        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;

        public virtual ICollection<OrderItemEntity> Items { get; set; } = [];
    }
}
