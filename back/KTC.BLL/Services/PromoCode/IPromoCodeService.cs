using KTC.BLL.Dto.PromoCode;

namespace KTC.BLL.Services.PromoCode
{
    public interface IPromoCodeService
    {
        Task<ServiceResponse> ValidateAsync(
            ValidatePromoCodeDto dto,
            string userId);
    }
}