namespace KTC.BLL.Dto.OrderItem
{
    public class OrderItemDto
    {
        public string Id { get; set; } = default!;
        public int Quantity { get; set; }
        public string OrderId { get; set; } = default!;
        public string ProductId { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
