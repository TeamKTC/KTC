using KTC.DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL;

public class AppDbContext : IdentityDbContext<UserEntity>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }
    public DbSet<OrderEntity> Orders { get; set; }
    public DbSet<OrderItemEntity> OrderItems { get; set; }
    public DbSet<NotificationEntity> Notifications { get; set; }
    public DbSet<CartEntity> Carts { get; set; }
    public DbSet<CartItemEntity> CartItems { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }
    public DbSet<MediaEntity> Media { get; set; }
    public DbSet<AttributeDefinitionEntity> AttributeDefinitions { get; set; }
    public DbSet<ProductAttributeEntity> ProductAttributes { get; set; }
    public DbSet<BrandEntity> Brands { get; set; }
    public DbSet<BonusEntity> Bonuses { get; set; }
    public DbSet<FavoriteEntity> Favorites { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // =======================
        // ORDER
        // =======================
        builder.Entity<OrderEntity>()
            .HasOne(x => x.User)
            .WithMany(x => x.Orders)
            .HasForeignKey(x => x.UserId);

        builder.Entity<OrderItemEntity>()
            .HasOne(x => x.Order)
            .WithMany(x => x.Items)
            .HasForeignKey(x => x.OrderId);

        builder.Entity<OrderItemEntity>()
            .HasOne(x => x.Product)
            .WithMany(x => x.OrderItems)
            .HasForeignKey(x => x.ProductId);


        // =======================
        // PRODUCT
        // =======================
        builder.Entity<ProductEntity>()
            .HasOne(x => x.Category)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.CategoryId);
       builder.Entity<MediaEntity>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Media)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);


        // =======================
        // CART
        // =======================
        builder.Entity<CartEntity>()
            .HasOne(x => x.User)
            .WithMany(x => x.Carts)
            .HasForeignKey(x => x.UserId);

        builder.Entity<CartItemEntity>()
            .HasOne(x => x.Cart)
            .WithMany(x => x.Items)
            .HasForeignKey(x => x.CartId);


        // =======================
        // COMMENT
        // =======================
        builder.Entity<CommentEntity>()
            .HasOne(x => x.User)
            .WithMany(x => x.Comments)
            .HasForeignKey(x => x.UserId);

        builder.Entity<CommentEntity>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Comments)
            .HasForeignKey(x => x.ProductId);

        builder.Entity<CommentEntity>()
            .HasOne(x => x.ParentComment)
            .WithMany(x => x.Replies)
            .HasForeignKey(x => x.ParentCommentId)
            .OnDelete(DeleteBehavior.Restrict);


        // =======================
        // NOTIFICATION
        // =======================
        builder.Entity<NotificationEntity>()
            .HasOne(x => x.User)
            .WithMany(x => x.Notifications)
            .HasForeignKey(x => x.UserId);

        builder.Entity<NotificationEntity>()
            .HasOne(x => x.Sender)
            .WithMany()
            .HasForeignKey(x => x.SenderId)
            .OnDelete(DeleteBehavior.Restrict);


        // =======================
        // PRODUCT ATTRIBUTE
        // =======================

        builder.Entity<ProductAttributeEntity>()
            .HasOne(x => x.Product)
            .WithMany(x => x.ProductAttributes)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ProductAttributeEntity>()
            .HasOne(x => x.AttributeDefinition)
            .WithMany(x => x.ProductAttributes)
            .HasForeignKey(x => x.AttributeDefinitionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<AttributeDefinitionEntity>()
            .HasIndex(x => x.Name)
            .IsUnique();

        builder.Entity<ProductAttributeEntity>()
            .HasIndex(x => new
            {
                x.ProductId,
                x.AttributeDefinitionId
            })
            .IsUnique();

        // =======================
        // BRAND
        // =======================

        builder.Entity<BrandEntity>()
            .HasMany(x => x.Products)
            .WithOne(x => x.Brand)
            .HasForeignKey(x => x.BrandId)
            .OnDelete(DeleteBehavior.Restrict);

        // =======================
        // BONUS
        // =======================
        builder.Entity<BonusEntity>()
            .HasOne(x => x.User)
            .WithMany(x => x.Bonuses)
            .HasForeignKey(x => x.UserId);

        builder.Entity<BonusEntity>()
            .HasOne(x => x.Order)
            .WithMany()
            .HasForeignKey(x => x.OrderId)
            .OnDelete(DeleteBehavior.SetNull);

        // =======================
        // FAVORITE
        // =======================

        builder.Entity<FavoriteEntity>()
        .HasOne(f => f.User)
        .WithMany()
        .HasForeignKey(f => f.UserId);

        builder.Entity<FavoriteEntity>()
         .HasOne(f => f.Product)
         .WithMany()
         .HasForeignKey(f => f.ProductId);

        builder.Entity<FavoriteEntity>()
         .HasIndex(f => new { f.UserId, f.ProductId })
         .IsUnique();
    }
}