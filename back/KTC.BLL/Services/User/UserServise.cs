using AutoMapper;
using KTC.BLL.Dto.User;
using KTC.BLL.Services.Email;
using KTC.DAL.Repositories.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using System.Net;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace KTC.BLL.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;

        public UserService(
            IUserRepository repository,
            IMapper mapper,
            IEmailService emailService,
            IMemoryCache cache)
        {
            _repository = repository;
            _mapper = mapper;
            _emailService = emailService;
            _cache = cache;
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

        public async Task<ServiceResponse> UpdateProfile(
            ClaimsPrincipal principal,
            UpdateProfileDto dto)
        {
            var userId = principal.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (string.IsNullOrEmpty(userId))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Користувач не авторизований",
                    StatusCode = HttpStatusCode.Unauthorized
                };
            }

            var user = await _repository.GetByIdAsync(userId);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Користувача не знайдено",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            if (string.IsNullOrWhiteSpace(dto.FirstName))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть ім'я",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (string.IsNullOrWhiteSpace(dto.LastName))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть прізвище",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (string.IsNullOrWhiteSpace(dto.Email))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть email",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var email = dto.Email.Trim().ToLower();

            if (!Regex.IsMatch(
                email,
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть коректний email",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var emailUser = await _repository.GetByEmailAsync(email);

            if (emailUser != null && emailUser.Id != user.Id)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Цей email вже використовується іншим користувачем",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть номер телефону",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var phoneNumber = dto.PhoneNumber.Trim();

            if (Regex.IsMatch(phoneNumber, @"^0\d{9}$"))
            {
                phoneNumber = "38" + phoneNumber;
            }
            else if (!Regex.IsMatch(phoneNumber, @"^380\d{9}$"))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Введіть коректний номер телефону",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var phoneUser = await _repository.GetByPhoneNumberAsync(phoneNumber);

            if (phoneUser != null && phoneUser.Id != user.Id)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Цей номер телефону вже використовується іншим користувачем",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (dto.BirthDate > DateOnly.FromDateTime(DateTime.UtcNow))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Дата народження не може бути в майбутньому",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            user.FirstName = dto.FirstName.Trim();
            user.LastName = dto.LastName.Trim();
            user.PhoneNumber = phoneNumber;
            user.BirthDate = dto.BirthDate;

            if (!string.Equals(
                user.Email,
                email,
                StringComparison.OrdinalIgnoreCase))
            {
                var code = Random.Shared
                    .Next(100000, 1000000)
                    .ToString();

                var codeKey = $"profile-email-code:{user.Id}";
                var emailKey = $"profile-email:{user.Id}";

                _cache.Set(
                    codeKey,
                    code,
                    TimeSpan.FromMinutes(10)
                );

                _cache.Set(
                    emailKey,
                    email,
                    TimeSpan.FromMinutes(10)
                );

                await _emailService.SendEmailAsync(
                    email,
                    "Підтвердження нового email",
                    $"""
                    <h2>Підтвердження нового email</h2>
                    <p>Ваш код підтвердження:</p>
                    <h1>{code}</h1>
                    <p>Код дійсний протягом 10 хвилин.</p>
                    """
                );

                await _repository.UpdateAsync(user);

                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "На новий email відправлено код підтвердження",
                    Payload = _mapper.Map<UserDto>(user),
                    StatusCode = HttpStatusCode.OK
                };
            }

            user.Email = email;
            user.UserName = email;

            await _repository.UpdateAsync(user);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Особисті дані успішно оновлено",
                Payload = _mapper.Map<UserDto>(user),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> ConfirmEmailChange(
            ClaimsPrincipal principal,
            string code)
        {
            var userId = principal.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (string.IsNullOrEmpty(userId))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Користувач не авторизований",
                    StatusCode = HttpStatusCode.Unauthorized
                };
            }

            var user = await _repository.GetByIdAsync(userId);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Користувача не знайдено",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            var codeKey = $"profile-email-code:{user.Id}";
            var emailKey = $"profile-email:{user.Id}";

            if (!_cache.TryGetValue<string>(
                    codeKey,
                    out var savedCode) ||
                !_cache.TryGetValue<string>(
                    emailKey,
                    out var newEmail))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Код недійсний або термін його дії закінчився",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (string.IsNullOrWhiteSpace(code) ||
                code != savedCode)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Неправильний код підтвердження",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            if (string.IsNullOrWhiteSpace(newEmail))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Email не знайдено",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var emailUser = await _repository.GetByEmailAsync(newEmail);

            if (emailUser != null && emailUser.Id != user.Id)
            {
                _cache.Remove(codeKey);
                _cache.Remove(emailKey);

                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Цей email вже використовується іншим користувачем",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            user.Email = newEmail;
            user.UserName = newEmail;
            user.NormalizedEmail = newEmail.ToUpperInvariant();
            user.NormalizedUserName = newEmail.ToUpperInvariant();
            await _repository.UpdateAsync(user);

            _cache.Remove(codeKey);
            _cache.Remove(emailKey);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Email успішно підтверджено",
                Payload = _mapper.Map<UserDto>(user),
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}