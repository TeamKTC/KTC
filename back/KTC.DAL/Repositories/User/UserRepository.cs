using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.User
{
    public class UserRepository : GenericRepository<UserEntity>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public Task<UserEntity?> GetByEmailAsync(string email)
        {
            return _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public Task<UserEntity?> GetByPhoneNumberAsync(string phoneNumber)
        {
            return _context.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
        }

        public Task<UserEntity?> GetByUserNameAsync(string userName)
        {
            return _context.Users
                .FirstOrDefaultAsync(x => x.UserName == userName);
        }

        public Task<bool> ExistsByEmailAsync(string email)
        {
            return _context.Users
                .AnyAsync(x => x.Email == email);
        }

        public Task<bool> ExistsByPhoneNumberAsync(string phoneNumber)
        {
            return _context.Users
                .AnyAsync(x => x.PhoneNumber == phoneNumber);
        }

        public Task<List<UserEntity>> GetAllUsersAsync()
        {
            return _context.Users
                .AsNoTracking()
                .ToListAsync();
        }

        public Task<List<UserEntity>> SearchAsync(string search)
        {
            return _context.Users
                .Where(x =>
                    x.FirstName.Contains(search) ||
                    x.LastName.Contains(search) ||
                    x.Email!.Contains(search) ||
                    x.UserName!.Contains(search))
                .AsNoTracking()
                .ToListAsync();
        }

        public Task<List<UserEntity>> GetUsersCreatedAfterAsync(DateTime date)
        {
            return _context.Users
                .Where(x => x.CreatedDate >= date)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
