using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.PromoCode
{
    public interface IPromoCodeRepository : IGenericRepository<PromoCodeEntity>
    {
        Task<PromoCodeEntity?> GetByCodeAsync(string code);

        Task<bool> HasUserUsedPromoCodeAsync(
            string promoCodeId,
            string userId);
    }
}