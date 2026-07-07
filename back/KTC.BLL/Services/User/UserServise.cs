using AutoMapper;
using KTC.BLL.Dto.User;
using KTC.DAL.Repositories.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _repository.GetAllUsersAsync();

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(string id)
        {
            var user = await _repository.GetByIdAsync(id);

            return _mapper.Map<UserDto?>(user);
        }

        public async Task<UserDto?> GetByEmailAsync(string email)
        {
            var user = await _repository.GetByEmailAsync(email);

            return _mapper.Map<UserDto?>(user);
        }

        public async Task<List<UserDto>> SearchAsync(string search)
        {
            var users = await _repository.SearchAsync(search);

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserDto>> GetUsersCreatedAfterAsync(DateTime date)
        {
            var users = await _repository.GetUsersCreatedAfterAsync(date);

            return _mapper.Map<List<UserDto>>(users);
        }
    }
}
