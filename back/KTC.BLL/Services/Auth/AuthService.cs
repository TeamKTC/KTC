using AutoMapper;
using KTC.BLL.Dto.Auth;
using KTC.BLL.Services;
using KTC.BLL.Services.Email;
using KTC.BLL.Services.Jwt;
using KTC.BLL.Services.TwoFactor;
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
    private readonly TwoFactorService _twoFactorService;

    public AuthService(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        JwtService jwtService,
        IMapper mapper,
        IEmailService emailService,
        TwoFactorService twoFactorService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _mapper = mapper;
        _emailService = emailService;
        _twoFactorService = twoFactorService;
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

        await _emailService.SendEmailAsync(
            user.Email!,
            "Акаунт успішно створено",
            $@"
            <h2>Вітаємо, {user.FirstName}!</h2>

            <p>Ваш акаунт успішно створено.</p>

            <p>
                Ви вже можете користуватися нашим сайтом.
            </p>

            <p>
                Для отримання сповіщень про замовлення, відновлення доступу 
                та додаткової безпеки акаунта рекомендуємо підтвердити 
                електронну пошту.
            </p>

            <p>
                Підтвердити Email можна у вашому особистому кабінеті, 
                натиснувши кнопку <b>«Підтвердити Email»</b>.
            </p>

            <p>
                Дякуємо, що користуєтесь нашим сайтом!
            </p>"
        );

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



        var result = await _signInManager.CheckPasswordSignInAsync(
            user,
            dto.Password,
            false);

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid password",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        // Якщо у користувача увімкнена двофакторна автентифікація
        if (user.TwoFactorEnabled)
        {
            if (string.IsNullOrEmpty(user.Email))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Email is required for two-factor authentication",
                    StatusCode = HttpStatusCode.BadRequest
                };
            }

            var code = _twoFactorService.GenerateCode();

            var challenge = _twoFactorService.CreateChallenge(
                user.Id,
                code);


            await _emailService.SendEmailAsync(
                user.Email,
                "Код двофакторної автентифікації",
                $@"
                <h2>Код підтвердження</h2>

                <p>Ви намагаєтесь увійти до свого акаунта.</p>

                <p>Ваш код підтвердження:</p>

                <h1 style='font-size: 32px; letter-spacing: 8px;'>
                    {code}
                </h1>

                <p>
                    Код дійсний протягом <b>5 хвилин</b>.
                </p>

                <p>
                    Якщо це були не ви, просто проігноруйте цей лист.
                </p>"
            );
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Two-factor authentication required",
                Payload = new
                {
                    RequiresTwoFactor = true,
                    Challenge = challenge
                },
                StatusCode = HttpStatusCode.OK
            };
        }


        var token = await _jwtService.GenerateToken(user);

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Login successful",
            Payload = new
            {
                RequiresTwoFactor = false,
                Token = token
            },
            StatusCode = HttpStatusCode.OK
        };
    }

    public async Task<ServiceResponse> VerifyTwoFactor(
        VerifyTwoFactorDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Challenge))
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Challenge is required",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        if (string.IsNullOrWhiteSpace(dto.Code))
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Code is required",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        // Отримуємо challenge
        var challenge = _twoFactorService.GetChallenge(dto.Challenge);

        if (challenge == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Code expired or challenge is invalid",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        // Перевіряємо код
        var isValid = _twoFactorService.VerifyCode(
            dto.Challenge,
            dto.Code);

        if (!isValid)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid verification code",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        // Знаходимо користувача
        var user = await _userManager.FindByIdAsync(
            challenge.UserId);

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        // Тільки після успішної 2FA видаємо JWT
        var token = await _jwtService.GenerateToken(user);

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Two-factor authentication successful",
            Payload = new
            {
                RequiresTwoFactor = false,
                Token = token
            },
            StatusCode = HttpStatusCode.OK
        };
    }

    public async Task<ServiceResponse> ConfirmEmail(
        string email,
        string token)
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

    public async Task<ServiceResponse> SendConfirmationEmail(
        ClaimsPrincipal principal)
    {
        var userId = principal.FindFirstValue(
            ClaimTypes.NameIdentifier);

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

        Console.WriteLine(
            user == null
                ? "USER NULL"
                : $"USER: {user.Email}");

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

        var token =
            await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var confirmationLink =
            $"https://localhost:7120/api/auth/confirm-email" +
            $"?email={Uri.EscapeDataString(user.Email!)}" +
            $"&token={Uri.EscapeDataString(token)}";

        await _emailService.SendEmailAsync(
            user.Email!,
            "Підтвердження електронної пошти",
            $@"
            <h2>Підтвердження Email</h2>

            <p>
                Натисніть кнопку нижче для підтвердження
                електронної пошти.
            </p>

            <p>
                <a href='{confirmationLink}'
                   style='background:#0d6efd;
                          color:white;
                          padding:12px 20px;
                          text-decoration:none;
                          border-radius:6px;'>
                    Підтвердити Email
                </a>
            </p>"
        );

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Confirmation email sent",
            StatusCode = HttpStatusCode.OK
        };
    }
    public async Task<ServiceResponse> EnableTwoFactor(ClaimsPrincipal principal)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

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

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        if (user.TwoFactorEnabled)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Two-factor authentication is already enabled",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        var token = await _userManager.GenerateTwoFactorTokenAsync(
            user,
            TokenOptions.DefaultEmailProvider
        );

        await _emailService.SendEmailAsync(
            user.Email!,
            "Код активації двофакторної автентифікації",
            $@"
            <h2>Активація двофакторної автентифікації</h2>

            <p>Ваш код:</p>

            <h1>{token}</h1>

            <p>Код дійсний протягом обмеженого часу.</p>
        "
        );

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Two-factor code sent",
            StatusCode = HttpStatusCode.OK
        };
    }

    public async Task<ServiceResponse> ConfirmEnableTwoFactor(
    ClaimsPrincipal principal,
    string code)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

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

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        if (user.TwoFactorEnabled)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Two-factor authentication is already enabled",
                StatusCode = HttpStatusCode.BadRequest
            };
        }
        Console.WriteLine($"CODE FROM FRONT: [{code}]");
        var isValid = await _userManager.VerifyTwoFactorTokenAsync(
            user,
            TokenOptions.DefaultEmailProvider,
            code
        );

        if (!isValid)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid or expired code",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        await _userManager.SetTwoFactorEnabledAsync(user, true);

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Two-factor authentication enabled successfully",
            StatusCode = HttpStatusCode.OK
        };
    }

    public async Task<ServiceResponse> DisableTwoFactor(ClaimsPrincipal principal)
    {
        var userId = principal.FindFirstValue(
            ClaimTypes.NameIdentifier
        );

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

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        if (!user.TwoFactorEnabled)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Two-factor authentication is already disabled",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        var token = await _userManager.GenerateTwoFactorTokenAsync(
            user,
            TokenOptions.DefaultEmailProvider
        );

        await _emailService.SendEmailAsync(
            user.Email!,
            "Код деактивації двофакторної автентифікації",
            $@"
            <h2>Деактивація двофакторної автентифікації</h2>

            <p>Ваш код підтвердження:</p>

            <h1>{token}</h1>

            <p>Якщо ви не запитували деактивацію 2FA, проігноруйте цей лист.</p>
        "
        );

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Two-factor deactivation code sent",
            StatusCode = HttpStatusCode.OK
        };
    }


    public async Task<ServiceResponse> ConfirmDisableTwoFactor(
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
                Message = "User is not authorized",
                StatusCode = HttpStatusCode.Unauthorized
            };
        }

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        if (!user.TwoFactorEnabled)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Two-factor authentication is already disabled",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        Console.WriteLine($"CODE FROM FRONT: [{code}]");
        Console.WriteLine($"CODE LENGTH: {code?.Length}");

        var isValid = await _userManager.VerifyTwoFactorTokenAsync(
            user,
            TokenOptions.DefaultEmailProvider,
            code
        );

        if (!isValid)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Invalid or expired code",
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        await _userManager.SetTwoFactorEnabledAsync(user, false);

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Two-factor authentication disabled successfully",
            StatusCode = HttpStatusCode.OK
        };
    }
    public async Task<ServiceResponse> ChangePassword(
    ClaimsPrincipal principal,
    ChangePasswordDto dto)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

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

        if (user == null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "User not found",
                StatusCode = HttpStatusCode.NotFound
            };
        }

        var result = await _userManager.ChangePasswordAsync(
            user,
            dto.CurrentPassword,
            dto.NewPassword
        );

        if (!result.Succeeded)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = string.Join(
                    ", ",
                    result.Errors.Select(e => e.Description)
                ),
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Password changed successfully",
            StatusCode = HttpStatusCode.OK
        };
    }
}