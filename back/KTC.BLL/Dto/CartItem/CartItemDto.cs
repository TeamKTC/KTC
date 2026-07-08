namespace KTC.BLL.Dto.CartItem
{
    public class CartItemDto
    {
        public string Id { get; set; } = default!;

        public string CartId { get; set; } = default!;

        public string ProductId { get; set; } = default!;

        public int Quantity { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}