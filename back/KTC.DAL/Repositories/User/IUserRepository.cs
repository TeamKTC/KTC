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
        Task<UserEntity?> GetByPhoneNumberAsync(string phoneNumber);
        Task<UserEntity?> GetByUserNameAsync(string userName);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> ExistsByPhoneNumberAsync(string phoneNumber);
        Task<List<UserEntity>> GetAllUsersAsync();
        Task<List<UserEntity>> SearchAsync(string search);
        Task<List<UserEntity>> GetUsersCreatedAfterAsync(DateTime date);

        Task AddBonusAsync(BonusEntity bonus);
    }
}
