using KTC.BLL.Dto;
using KTC.BLL.Dto.Bonus;

namespace KTC.BLL.Services.Bonus
{
    public interface IBonusService
    {
        Task<ServiceResponse> GetUserBonuses(string userId);

        Task<ServiceResponse> GetBonusBalance(string userId);
    }
}