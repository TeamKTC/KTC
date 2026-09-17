using KTC.BLL.Dto.CreditCard;

namespace KTC.BLL.Services.CreditCard
{
    public interface ICreditCardService
    {
        Task<ServiceResponse> CreateAsync(CreateCreditCardDto dto);
        Task<ServiceResponse> DeleteAsync (string id);
        Task<ServiceResponse> GetByUserID(string userId);
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetAllCreidtCards();
    }
}
