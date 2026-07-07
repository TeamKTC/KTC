using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Product
{
    public class ProductDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public string CategoryId { get; set; } = default!;
        public CategoryEntity Category { get; set; } = default!;

        public virtual ICollection<OrderItemEntity> OrderItems { get; set; } = [];

        public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    }
}
