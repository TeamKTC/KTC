using System;
using System.Collections.Generic;

namespace KTC.DAL.Entities
{
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
    }
}