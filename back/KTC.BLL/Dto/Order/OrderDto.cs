using KTC.DAL.Entities;

public class OrderDto
{
    public string Id { get; set; } = default!;

    public string OrderNumber { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; }

    public string Status { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public UserEntity User { get; set; } = default!;

    public virtual ICollection<OrderItemEntity> Items { get; set; } = [];

    public decimal TotalPrice { get; set; }

    public int UsedBonuses { get; set; }

    public string? PromoCodeId { get; set; }

    public decimal PromoDiscount { get; set; }


    // Delivery
    public string? City { get; set; }

    public string? Department { get; set; }

    public string? Address { get; set; }


    // Payment
    public string PaymentType { get; set; } = "cash";

    public string? InstallmentBank { get; set; }


    // Additional
    public string? Comment { get; set; }
}