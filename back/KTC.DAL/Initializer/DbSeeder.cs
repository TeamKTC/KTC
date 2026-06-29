using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
namespace KTC.DAL.Initializer
{
    public static class DbSeeder
    {
        public static void Seed(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            if (db.Users.Any()) return;


            var categoryId = Guid.NewGuid().ToString();
            var userId = Guid.NewGuid().ToString();
            var productId = Guid.NewGuid().ToString();
            var cartId = Guid.NewGuid().ToString();
            var cartItemId = Guid.NewGuid().ToString();
            var orderId = Guid.NewGuid().ToString();
            var orderItemId = Guid.NewGuid().ToString();
            var commentId = Guid.NewGuid().ToString();
            var notificationId = Guid.NewGuid().ToString();


            var user = new UserEntity
            {
                Id = userId,
                FirstName = "John",
                LastName = "Smith",
                Email = "john@gmail.com",
                PasswordHash = "123456",
                PhoneNumber = "+380000000000",
                Role = Role.User,
                RoleId = Guid.NewGuid().ToString()
            };


            var category = new CategoryEntity
            {
                Id = categoryId,
                Name = "Phones"
            };


            var product = new ProductEntity
            {
                Id = productId,
                Name = "iPhone",
                Description = "Smartphone",
                Price = 50000,
                Quantity = 5,

                CategoryId = categoryId,
                Category = category
            };


            var cart = new CartEntity
            {
                Id = cartId,

                UserId = userId,
                User = user,

                CreatedAt = DateTime.UtcNow
            };


            var cartItem = new CartItemEntity
            {
                Id = cartItemId,

                CartId = cartId,
                Cart = cart,

                ProductName = product.Name,
                Price = product.Price,
                Quantity = 2
            };


            var order = new OrderEntity
            {
                Id = orderId,

                Date = DateTime.UtcNow,
                Status = "Created",

                UserId = userId,
                User = user
            };


            var orderItem = new OrderItemEntity
            {
                Id = orderItemId,

                OrderId = orderId,
                Order = order,

                ProductId = productId,
                Product = product,

                Quantity = 1
            };


            var comment = new CommentEntity
            {
                Id = commentId,

                Text = "Good product",

                UserId = userId,
                User = user,

                ProductId = productId,
                Product = product
            };


            var notification = new NotificationEntity
            {
                Id = notificationId,

                Message = "Order created",
                IsRead = false,
                Type = "Order",

                UserId = userId,
                User = user
            };


            db.Users.Add(user);
            db.Categories.Add(category);
            db.Products.Add(product);

            db.Carts.Add(cart);
            db.CartItems.Add(cartItem);

            db.Orders.Add(order);
            db.OrderItems.Add(orderItem);

            db.Comments.Add(comment);
            db.Notifications.Add(notification);


            db.SaveChanges();
        }
    }
}
