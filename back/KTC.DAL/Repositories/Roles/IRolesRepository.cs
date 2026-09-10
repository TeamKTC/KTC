
namespace KTC.DAL.Repositories.Roles
{
    public interface IRolesRepository 
    {
        Task<bool> IsUserAdmin(string userId);
    }
}
