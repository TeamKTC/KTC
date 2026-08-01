using KTC.BLL.Interfaces;
using KTC.BLL.Services;
using KTC.BLL.Services.AttributeDefinition;
using KTC.BLL.Services.Brand;
using KTC.BLL.Services.Cart;
using KTC.BLL.Services.CartItem;
using KTC.BLL.Services.Catagory;
using KTC.BLL.Services.Comment;
using KTC.BLL.Services.Email;
using KTC.BLL.Services.Jwt;
using KTC.BLL.Services.Notification;
using KTC.BLL.Services.Order;
using KTC.BLL.Services.OrderItem;
using KTC.BLL.Services.Product;
using KTC.BLL.Services.ProductAttribute;
using KTC.BLL.Services.User;
using KTC.BLL.Settings;
using KTC.DAL;
using KTC.DAL.Entities;
using KTC.DAL.Initializer;
using KTC.DAL.Repositories.AttributeDefinition;
using KTC.DAL.Repositories.Brand;
using KTC.DAL.Repositories.Cart;
using KTC.DAL.Repositories.CartItem;
using KTC.DAL.Repositories.Category;
using KTC.DAL.Repositories.Comment;
using KTC.DAL.Repositories.Media;
using KTC.DAL.Repositories.Notification;
using KTC.DAL.Repositories.Order;
using KTC.DAL.Repositories.OrderItem;
using KTC.DAL.Repositories.Product;
using KTC.DAL.Repositories.ProductAttribute;
using KTC.DAL.Repositories.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
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

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                builder.Configuration["JwtSettings:SecretKey"]!
            ))
    };
});


builder.Services.AddAutoMapper(options =>
{
    options.LicenseKey = builder.Configuration["Automapper:LicenseKey"];
}, AppDomain.CurrentDomain.GetAssemblies());

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));
// Add repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();    
builder.Services.AddScoped<IProductAttributeRepository, ProductAttributeRepository>();
builder.Services.AddScoped<IAttributeDefinitionRepository, AttributeDefinitionRepository>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();


// Add service
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<ICartService, CartService>();    
builder.Services.AddScoped<ICartItemService, CartItemService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IOrderItemService, OrderItemService>();
builder.Services.AddScoped<IBlobStorageService, BlobStorageService>();
builder.Services.AddScoped<IBrandService,  BrandService>();

builder.Services.AddScoped<IProductAttributeService, ProductAttributeService>();
builder.Services.AddScoped<IAttibuteDefinitionService, AttibuteDefinitionService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "������ JWT �����"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

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