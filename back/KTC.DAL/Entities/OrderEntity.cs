using KTC.DAL.Entities;

public class OrderEntity : BaseEntity
{
    public string OrderNumber { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public string Status { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public UserEntity User { get; set; } = default!;

    public virtual ICollection<OrderItemEntity> Items { get; set; } = [];

    public decimal TotalPrice { get; set; }

    public int UsedBonuses { get; set; }

    public string? PromoCodeId { get; set; }

    public PromoCodeEntity? PromoCode { get; set; }

    public decimal PromoDiscount { get; set; }

    public string DeliveryType { get; set; } = "pickup";

    public string? City { get; set; }

    public string? Department { get; set; }

    public string? Address { get; set; }

    public string PaymentType { get; set; } = "cash";

    public string? InstallmentBank { get; set; }

    public string? Comment { get; set; }
}