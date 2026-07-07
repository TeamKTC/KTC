using KTC.BLL.Dto.CartItem;

    namespace KTC.BLL.Dto.Cart
    {
        public class CartDto
        {
            public string Id { get; set; } = default!;
            public string UserId { get; set; } = default!;
            public DateTime CreatedDate { get; set; }
            public DateTime CreatedAt { get; set; }
            public List<CartItemDto> Items { get; set; } = [];
        }
    }

