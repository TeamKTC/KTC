using AutoMapper;
using KTC.BLL.Dto.User;
using KTC.DAL.Repositories.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public async Task<ServiceResponse> GetAllUsersAsync()
        {
            var users = await _repository.GetAllUsersAsync();

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<UserDto>>(users),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<UserDto>(user),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetByEmailAsync(string email)
        {
            var user = await _repository.GetByEmailAsync(email);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<UserDto>(user),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> SearchAsync(string search)
        {
            var users = await _repository.SearchAsync(search);

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<UserDto>>(users),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetUsersCreatedAfterAsync(DateTime date)
        {
            date = DateTime.SpecifyKind(date.Date, DateTimeKind.Utc);

            var users = await _repository.GetUsersCreatedAfterAsync(date);

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<UserDto>>(users),
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}
