using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.User
{
    public class UserRepository
        : GenericRepository<UserEntity>, IUserRepository
    {


        public UserRepository(AppDbContext context)
            : base(context)
        {

        }


        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);
        }


        public async Task<UserEntity?> GetByPhoneNumberAsync(string phone)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == phone);
        }
    }
}
