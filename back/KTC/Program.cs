using KTC.BLL.Services.Jwt;
using KTC.DAL;
using KTC.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using KTC.DAL.Initializer;
using KTC.DAL.Repositories.User;
using KTC.DAL.Repositories.Notification;
using KTC.DAL.Repositories.Cart;
using KTC.DAL.Repositories.CartItem;
using KTC.BLL.Services.Notification;
using KTC.BLL.Services.Cart;
using KTC.BLL.Services.CartItem;
using KTC.BLL.Services.User;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultDb"))
);

builder.Services.AddIdentity<UserEntity, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;

    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddAutoMapper(options =>
{
    options.LicenseKey = builder.Configuration["Automapper:LicenseKey"];
}, AppDomain.CurrentDomain.GetAssemblies());
// Add repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();


// Add service
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<ICartService, CartService>();    
builder.Services.AddScoped<ICartItemService, CartItemService>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Seed();

app.Run();