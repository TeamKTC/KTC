namespace KTC.BLL.Dto.PromoCode
{
    public class ValidatePromoCodeDto
    {
        public string Code { get; set; } = string.Empty;
        public decimal OrderAmount { get; set; }
    }
}