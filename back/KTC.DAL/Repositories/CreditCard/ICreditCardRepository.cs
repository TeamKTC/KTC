using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.CreditCard
{
    public interface ICreditCardRepository : IGenericRepository<CreditCardEntity>
    {
        Task<List<CreditCardEntity>> GetByUserID(string userId);
    }
}
