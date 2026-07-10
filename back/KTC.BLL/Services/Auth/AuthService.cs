using AutoMapper;
using KTC.BLL.Dto.Auth;
using KTC.BLL.Services;
using KTC.BLL.Services.Email;
using KTC.BLL.Services.Jwt;
using KTC.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;

public class AuthService
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly JwtService _jwtService;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public AuthService(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        JwtService jwtService,
        IMapper mapper,
        IEmailService emailService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _mapper = mapper;
        _emailService = emailService;
    }



    public async Task<ServiceResponse> Register(RegisterDto dto)
    {
        var user = _mapper.Map<UserEntity>(dto);

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = string.Join(", ", result.Errors.Select(x => x.Description)),
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        await _userManager.AddToRoleAsync(user, "User");

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var confirmationLink =
            $"https://localhost:7120/api/auth/confirm-email?email={Uri.EscapeDataString(user.Email!)}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendEmailAsync(
            user.Email!,
            "Підтвердження електронної пошти",
            $@"
            <h2>Вітаємо!</h2>

            <p>Ваш акаунт успішно створено.</p>

            <p>Для завершення реєстрації підтвердіть свою електронну пошту.</p>

            <p>
                <a href='{confirmationLink}'
                   style='background:#0d6efd;color:white;padding:12px 20px;
                          text-decoration:none;border-radius:6px;'>
                    Підтвердити Email
                </a>
            </p>

            <p>Якщо кнопку не видно, відкрийте це посилання:</p>

            <p>{confirmationLink}</p>
            ");

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "User created successfully",
            StatusCode = HttpStatusCode.OK
        };
    }

    public async Task<ServiceResponse> Login(LoginDto dto)
    {
        UserEntity? user;

        if (dto.Login.Contains("@"))
        {
            user = await _userManager.FindByEmailAsync(dto.Login);
        }
        else
        {
            user = await _userManager.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == dto.Login);
        }

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }







        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid password",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        var token = await _jwtService.GenerateToken(user);

        return new ServiceResponse
        {
            IsSuccess = true, 
            Message = "Login successful",
            Payload = token,
            StatusCode = HttpStatusCode.OK
        };
    }
    public async Task<ServiceResponse> ConfirmEmail(string email, string token)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid token",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Email confirmed successfully",
            StatusCode = HttpStatusCode.OK
        };
    } 









    public async Task<ServiceResponse> SendConfirmationEmail(ClaimsPrincipal principal)
    {

        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine($"UserId: {userId}");

        if (string.IsNullOrEmpty(userId))
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User is not authorized",
                StatusCode = HttpStatusCode.Unauthorized
            };
        }

        var user = await _userManager.FindByIdAsync(userId);
        Console.WriteLine(user == null ? "USER NULL" : $"USER: {user.Email}");

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        if (user.EmailConfirmed)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Email is already confirmed",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var confirmationLink =
            $"http://localhost:5173/confirm-email?email={Uri.EscapeDataString(user.Email!)}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendEmailAsync(
            user.Email!,
            "Підтвердження електронної пошти",
            $@"
        <h2>Підтвердження Email</h2>

        <p>Натисніть кнопку нижче для підтвердження електронної пошти.</p>

        <p>
            <a href='{confirmationLink}'
               style='background:#0d6efd;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;'>
                Підтвердити Email
            </a>
        </p>");

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Confirmation email sent",
            StatusCode = HttpStatusCode.OK
        };
    }
}