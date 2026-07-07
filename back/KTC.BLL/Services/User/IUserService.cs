using KTC.BLL.Dto.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.User
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();

        Task<UserDto?> GetByIdAsync(string id);

        Task<UserDto?> GetByEmailAsync(string email);

        Task<List<UserDto>> SearchAsync(string search);

        Task<List<UserDto>> GetUsersCreatedAfterAsync(DateTime date);
    }
}
