namespace KTC.DAL.Entities
{
    public class PromoCodeUsageEntity : BaseEntity
    {
        public string PromoCodeId { get; set; } = default!;

        public PromoCodeEntity PromoCode { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public UserEntity User { get; set; } = default!;

        public string OrderId { get; set; } = default!;

        public OrderEntity Order { get; set; } = default!;

        public decimal DiscountAmount { get; set; }
    }
}