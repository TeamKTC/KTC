namespace KTC.BLL.Dto.OrderItem
{
    public class UpdateOrderItemDto
    {
        public string Id { get; set; } = default!;
        public int Quantity { get; set; }
        public string OrderId { get; set; } = default!;
        public string ProductId { get; set; } = default!;
    }
}
