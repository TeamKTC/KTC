using AutoMapper;
using KTC.BLL.Dto.Auth;
using KTC.BLL.Services;
using KTC.BLL.Services.Jwt;
using KTC.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;
public class AuthService
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly JwtService _jwtService;
    private readonly IMapper _mapper;

    public AuthService(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        JwtService jwtService,
        IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _mapper = mapper;
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

        var token = await  _jwtService.GenerateToken(user);

        return new ServiceResponse
        {
            IsSuccess = true,
            Message = "Login successful",
            Payload = token,
            StatusCode = HttpStatusCode.OK
        };
    }
}