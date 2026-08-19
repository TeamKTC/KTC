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
}   