using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.PromoCode
{
    public class PromoCodeRepository
        : GenericRepository<PromoCodeEntity>,
          IPromoCodeRepository
    {
        public PromoCodeRepository(AppDbContext context)
            : base(context)
        {
        }

        public async Task<PromoCodeEntity?> GetByCodeAsync(string code)
        {
            return await _context.PromoCodes
                .FirstOrDefaultAsync(x =>
                    x.Code.ToUpper() == code.ToUpper());
        }

        public async Task<bool> HasUserUsedPromoCodeAsync(
            string promoCodeId,
            string userId)
        {
            return await _context.PromoCodeUsages
                .AnyAsync(x =>
                    x.PromoCodeId == promoCodeId &&
                    x.UserId == userId);
        }
    }
}