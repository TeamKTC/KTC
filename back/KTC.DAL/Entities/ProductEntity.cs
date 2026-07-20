using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class ProductEntity : BaseEntity
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public string CategoryId { get; set; } = default!;
        public CategoryEntity Category { get; set; } = default!;

        public virtual ICollection<OrderItemEntity> OrderItems { get; set; } = [];

        public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
        public ICollection<MediaEntity> Media { get; set; } = [];
    }
}
