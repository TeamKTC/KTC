namespace KTC.BLL.Dto.OrderItem
{
    public class CreateOrderItemDto
    {
        public int Quantity { get; set; }
        public string OrderId { get; set; } = default!;
        public string ProductId { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
