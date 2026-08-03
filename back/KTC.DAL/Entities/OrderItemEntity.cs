namespace KTC.DAL.Entities
{
    public class OrderItemEntity : BaseEntity
    {
        public int Quantity { get; set; }

        public string OrderId { get; set; } = default!;
        public OrderEntity Order { get; set; } = default!;

        public string ProductId { get; set; } = default!;
        public ProductEntity Product { get; set; } = default!;

        public decimal Price { get; set; }
    }
}
