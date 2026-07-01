using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Repositories.User
{
    public interface IUserRepository : IGenericRepository<UserEntity>
    {
        Task<UserEntity?> GetByEmailAsync(string email);
        Task<UserEntity?> GetByPhoneNumberAsync(string phone);
    }
}
