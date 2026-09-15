using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.CreditCard
{
    public class CreditCardRepository: GenericRepository<CreditCardEntity>, ICreditCardRepository
    {
        public CreditCardRepository(AppDbContext context) : base(context){}

        public async Task<List<CreditCardEntity>> GetByUserID(string userId)
        {
            return await _context.CreaditCards
                        .Where(cr => cr.UserId == userId)
                        .ToListAsync();
        }
    }
}
