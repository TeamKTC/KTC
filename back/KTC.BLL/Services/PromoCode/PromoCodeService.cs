using KTC.BLL.Dto.PromoCode;
using KTC.DAL.Repositories.PromoCode;
using System.Net;

namespace KTC.BLL.Services.PromoCode
{
    public class PromoCodeService : IPromoCodeService
    {
        private readonly IPromoCodeRepository _promoCodeRepository;

        public PromoCodeService(
            IPromoCodeRepository promoCodeRepository)
        {
            _promoCodeRepository = promoCodeRepository;
        }

        public async Task<ServiceResponse> ValidateAsync(
            ValidatePromoCodeDto dto,
            string userId)
        {
            if (string.IsNullOrWhiteSpace(dto.Code))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Введіть промокод"
                };
            }

            if (dto.OrderAmount <= 0)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Некоректна сума замовлення"
                };
            }

            var code = dto.Code.Trim().ToUpper();

            var promoCode =
                await _promoCodeRepository.GetByCodeAsync(code);

            if (promoCode == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "Промокод не знайдено"
                };
            }

            if (!promoCode.IsActive)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Промокод неактивний"
                };
            }

            var now = DateTime.UtcNow;

            if (promoCode.StartDate.HasValue &&
                now < promoCode.StartDate.Value)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Промокод ще не діє"
                };
            }

            if (promoCode.EndDate.HasValue &&
                now > promoCode.EndDate.Value)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Термін дії промокоду закінчився"
                };
            }

            if (promoCode.MaxUsageCount.HasValue &&
                promoCode.UsageCount >= promoCode.MaxUsageCount.Value)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Промокод більше недоступний"
                };
            }

            if (promoCode.MinOrderAmount.HasValue &&
                dto.OrderAmount < promoCode.MinOrderAmount.Value)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message =
                        $"Мінімальна сума замовлення — " +
                        $"{promoCode.MinOrderAmount.Value} грн"
                };
            }

            var alreadyUsed =
                await _promoCodeRepository.HasUserUsedPromoCodeAsync(
                    promoCode.Id,
                    userId);

            if (alreadyUsed)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Ви вже використовували цей промокод"
                };
            }

            decimal discount;

            if (promoCode.IsPercentage)
            {
                discount =
                    dto.OrderAmount *
                    promoCode.DiscountValue /
                    100;

                if (promoCode.MaxDiscountAmount.HasValue)
                {
                    discount = Math.Min(
                        discount,
                        promoCode.MaxDiscountAmount.Value);
                }
            }
            else
            {
                discount = promoCode.DiscountValue;
            }

            discount = Math.Min(
                discount,
                dto.OrderAmount);

            var finalAmount =
                dto.OrderAmount - discount;

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Промокод успішно застосовано",
                Payload = new PromoCodeResultDto
                {
                    IsValid = true,
                    Code = promoCode.Code,
                    DiscountAmount = discount,
                    FinalAmount = finalAmount,
                    Message = "Промокод успішно застосовано"
                }
            };
        }
    }
}