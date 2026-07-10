using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class CartItemEntity : BaseEntity
    {
        public string CartId { get; set; } = default!;
        public CartEntity Cart { get; set; } = default!;

        public string ProductName { get; set; } = default!;

        public string ProductId { get; set; } = default!;   
        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
