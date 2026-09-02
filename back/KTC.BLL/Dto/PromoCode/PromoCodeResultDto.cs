namespace KTC.BLL.Dto.PromoCode
{
    public class PromoCodeResultDto
    {
        public string PromoCodeId { get; set; } = string.Empty; 
        public bool IsValid { get; set; }

        public string Code { get; set; } = string.Empty;

        public decimal DiscountAmount { get; set; }

        public decimal FinalAmount { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}