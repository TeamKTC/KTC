
namespace KTC.BLL.Services.Role
{
    public interface IRoleService
    {
        Task<ServiceResponse> IsUserAdmin(string userId);
    }
}
