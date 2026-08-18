using KTC.BLL.Dto.User;
using System.Security.Claims;

namespace KTC.BLL.Services.User
{
    public interface IUserService
    {
        Task<ServiceResponse> GetAllUsersAsync();

        Task<ServiceResponse> GetByIdAsync(string id);

        Task<ServiceResponse> GetByEmailAsync(string email);

        Task<ServiceResponse> SearchAsync(string search);

        Task<ServiceResponse> GetUsersCreatedAfterAsync(DateTime date);

        Task<ServiceResponse> UpdateProfile(
            ClaimsPrincipal principal,
            UpdateProfileDto dto);

        Task<ServiceResponse> ConfirmEmailChange(
            ClaimsPrincipal principal,
            string code);
    }
}