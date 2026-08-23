namespace KTC.DAL.Entities
{
    public class PromoCodeEntity : BaseEntity
    {
        public string Code { get; set; } = string.Empty;

        public decimal DiscountValue { get; set; }

        public bool IsPercentage { get; set; }

        public decimal? MinOrderAmount { get; set; }

        public decimal? MaxDiscountAmount { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? MaxUsageCount { get; set; }

        public int UsageCount { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual ICollection<PromoCodeUsageEntity> Usages { get; set; } = [];
    }
}