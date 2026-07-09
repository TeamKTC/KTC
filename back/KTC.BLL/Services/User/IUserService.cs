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
        Task<ServiceResponse> GetAllUsersAsync();
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByEmailAsync(string email);
        Task<ServiceResponse> SearchAsync(string search);
        Task<ServiceResponse> GetUsersCreatedAfterAsync(DateTime date);
    }
}
