using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class OrderItemEntity : BaseEntity
    {
        public int Quantity { get; set; }

        public string OrderId { get; set; } = default!;
        public OrderEntity Order { get; set; } = default!;

        public string ProductId { get; set; } = default!;
        public ProductEntity Product { get; set; } = default!;
    }
}
