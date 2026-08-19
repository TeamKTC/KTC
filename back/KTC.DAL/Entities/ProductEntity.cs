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
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Rate { get; set; }
        public int SoldPerMonth { get; set; }
        public int AmountOfComments { get; set; }

        public string? BrandId { get; set; } = default!;
        public BrandEntity? Brand { get; set; } = default!;
        public string CategoryId { get; set; } = default!;
        public CategoryEntity Category { get; set; } = default!;

        public virtual ICollection<OrderItemEntity> OrderItems { get; set; } = [];

        public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
        public ICollection<MediaEntity> Media { get; set; } = [];
        public ICollection<ProductAttributeEntity> ProductAttributes { get; set; } = new List<ProductAttributeEntity>();
    }
}
