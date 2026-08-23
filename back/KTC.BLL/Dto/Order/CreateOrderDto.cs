namespace KTC.BLL.Dto.Order
{
    public class CreateOrderDto
    {
        public DateTime Date { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string Status { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public string? PromoCodeId { get; set; }

        public int UsedBonuses { get; set; }
    }
}