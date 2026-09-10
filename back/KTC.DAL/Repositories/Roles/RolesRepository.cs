using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Roles
{
    public class RolesRepository : IRolesRepository
    {
        private readonly AppDbContext _context;

        public RolesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsUserAdmin(string userId)
        {
            return await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == "36d60aaa-7686-4774-aa7a-9e3e28ba9d68");
        }
    }
}
