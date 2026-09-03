namespace KTC.BLL.Dto.Order
{
    public class CreateOrderDto
    {
        public DateTime Date { get; set; }
        public DateTime ReleaseDate { get; set; }

        public string Status { get; set; } = "Pending";

        public string? PromoCodeId { get; set; }

        public int UsedBonuses { get; set; }

        public string? DeliveryType { get; set; }

        public string? City { get; set; }

        public string? Department { get; set; }

        public string? Address { get; set; }

        public string PaymentType { get; set; } = "cash";

        public string? InstallmentBank { get; set; }

        public string? Comment { get; set; }
    }
}