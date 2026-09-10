using KTC.DAL.Repositories.Roles;

namespace KTC.BLL.Services.Role
{
    public class RoleService : IRoleService
    {
        private readonly IRolesRepository _rolesRepository;

        public RoleService(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        public async Task<ServiceResponse> IsUserAdmin(string userId)
        {
            var isAdmin = await _rolesRepository.IsUserAdmin(userId);
            return new ServiceResponse { IsSuccess = true, Payload = isAdmin };
        }
    }
}
