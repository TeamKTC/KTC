using KTC.DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace KTC.DAL.Initializer
{
    public static class DbSeeder
    {
        public static async Task Seed(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // ---------------------------------------------------------
            // ROLES
            // ---------------------------------------------------------

            if (!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new IdentityRole("User"));

            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new IdentityRole("Admin"));

            // ---------------------------------------------------------
            // НЕ ЗАПУСКАЄМО SEED ПОВТОРНО
            // ---------------------------------------------------------

            if (db.Products.Any())
                return;

            // ---------------------------------------------------------
            // USERS
            // ---------------------------------------------------------

            var users = new List<UserEntity>();

            var userData = new[]
            {
                ("john@gmail.com", "John", "Smith", "+380671112233"),
                ("alex@gmail.com", "Alex", "Johnson", "+380672223344"),
                ("michael@gmail.com", "Michael", "Brown", "+380673334455"),
                ("james@gmail.com", "James", "Wilson", "+380674445566"),
                ("david@gmail.com", "David", "Taylor", "+380675556677"),
                ("oliver@gmail.com", "Oliver", "Anderson", "+380676667788"),
                ("daniel@gmail.com", "Daniel", "Thomas", "+380677778899"),
                ("admin@ktc.ua", "Admin", "KTC", "+380688889900")
            };

            foreach (var data in userData)
            {
                var user = new UserEntity
                {
                    UserName = data.Item1,
                    Email = data.Item1,
                    FirstName = data.Item2,
                    LastName = data.Item3,
                    PhoneNumber = data.Item4,
                    EmailConfirmed = true,
                    CreatedDate = DateTime.UtcNow.AddDays(-Random.Shared.Next(10, 300)),
                    BirthDate = new DateOnly(
                        Random.Shared.Next(1985, 2003),
                        Random.Shared.Next(1, 13),
                        Random.Shared.Next(1, 25)
                    ),
                    BonusBalance = 0
                };

                var result = await userManager.CreateAsync(user, "Test123!");

                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(x => x.Description));
                    throw new Exception($"Не вдалося створити {data.Item1}: {errors}");
                }

                await userManager.AddToRoleAsync(
                    user,
                    data.Item1 == "admin@ktc.ua" ? "Admin" : "User"
                );

                users.Add(user);
            }

            var john = users[0];
            var alex = users[1];
            var michael = users[2];
            var james = users[3];
            var david = users[4];
            var oliver = users[5];
            var daniel = users[6];

            // ---------------------------------------------------------
            // CATEGORIES
            // ---------------------------------------------------------

            var smartphones = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Смартфони"
            };

            var laptops = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Ноутбуки"
            };

            var tablets = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Планшети"
            };

            var headphones = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Навушники"
            };

            var watches = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Смарт-годинники"
            };

            var tv = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Телевізори"
            };

            var monitors = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Монітори"
            };

            var accessories = new CategoryEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Аксесуари"
            };

            db.Categories.AddRange(
                smartphones,
                laptops,
                tablets,
                headphones,
                watches,
                tv,
                monitors,
                accessories
            );

            // ---------------------------------------------------------
            // BRANDS
            // ---------------------------------------------------------

            var apple = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Apple",
                Description = "Технологічні пристрої Apple"
            };

            var samsung = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Samsung",
                Description = "Смартфони, телевізори та електроніка Samsung"
            };

            var xiaomi = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Xiaomi",
                Description = "Смарт-пристрої та електроніка Xiaomi"
            };

            var google = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Google",
                Description = "Google Pixel та інші пристрої"
            };

            var asus = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "ASUS",
                Description = "Ноутбуки та монітори ASUS"
            };

            var lenovo = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Lenovo",
                Description = "Ноутбуки та планшети Lenovo"
            };

            var sony = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Sony",
                Description = "Аудіо та телевізори Sony"
            };

            var jbl = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "JBL",
                Description = "Аудіотехніка JBL"
            };

            var lg = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "LG",
                Description = "Телевізори та монітори LG"
            };

            var huawei = new BrandEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Huawei",
                Description = "Смарт-пристрої Huawei"
            };

            db.Brands.AddRange(
                apple,
                samsung,
                xiaomi,
                google,
                asus,
                lenovo,
                sony,
                jbl,
                lg,
                huawei
            );

            // ---------------------------------------------------------
            // ATTRIBUTE DEFINITIONS
            // ---------------------------------------------------------

            var diagonal = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Діагональ",
                Type = "string"
            };

            var processor = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Процесор",
                Type = "string"
            };

            var ram = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Оперативна пам'ять",
                Type = "string"
            };

            var storage = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Вбудована пам'ять",
                Type = "string"
            };

            var battery = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Акумулятор",
                Type = "string"
            };

            var camera = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Камера",
                Type = "string"
            };

            var os = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Операційна система",
                Type = "string"
            };

            var screen = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Тип дисплея",
                Type = "string"
            };

            var refreshRate = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Частота оновлення",
                Type = "string"
            };

            var color = new AttributeDefinitionEntity
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Колір",
                Type = "string"
            };

            db.AttributeDefinitions.AddRange(
                diagonal,
                processor,
                ram,
                storage,
                battery,
                camera,
                os,
                screen,
                refreshRate,
                color
            );

            // ---------------------------------------------------------
            // PRODUCTS
            // ---------------------------------------------------------

            var products = new List<ProductEntity>
            {
                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple iPhone 15 128GB Black",
                    Description = "Сучасний смартфон Apple з OLED-дисплеєм та потужним процесором.",
                    Price = 30999,
                    OldPrice = 33999,
                    Quantity = 18,
                    Rate = 5,
                    SoldPerMonth = 47,
                    AmountOfComments = 12,
                    BrandId = apple.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple iPhone 15 Pro 256GB Natural Titanium",
                    Description = "Професійний смартфон Apple з титановим корпусом.",
                    Price = 45999,
                    OldPrice = 48999,
                    Quantity = 9,
                    Rate = 5,
                    SoldPerMonth = 31,
                    AmountOfComments = 9,
                    BrandId = apple.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple iPhone 16 128GB Black",
                    Description = "Новий iPhone з продуктивним процесором та покращеною камерою.",
                    Price = 36999,
                    OldPrice = 38999,
                    Quantity = 14,
                    Rate = 5,
                    SoldPerMonth = 42,
                    AmountOfComments = 15,
                    BrandId = apple.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy S24 256GB",
                    Description = "Флагманський смартфон Samsung з AMOLED-дисплеєм.",
                    Price = 31999,
                    OldPrice = 34999,
                    Quantity = 21,
                    Rate = 5,
                    SoldPerMonth = 55,
                    AmountOfComments = 18,
                    BrandId = samsung.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy S24 Ultra 512GB",
                    Description = "Потужний флагман Samsung з камерою 200 Мп.",
                    Price = 51999,
                    OldPrice = 55999,
                    Quantity = 7,
                    Rate = 5,
                    SoldPerMonth = 28,
                    AmountOfComments = 11,
                    BrandId = samsung.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy A55 256GB",
                    Description = "Збалансований смартфон середнього класу.",
                    Price = 17999,
                    OldPrice = 19499,
                    Quantity = 30,
                    Rate = 4,
                    SoldPerMonth = 63,
                    AmountOfComments = 21,
                    BrandId = samsung.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Xiaomi Redmi Note 13 Pro 256GB",
                    Description = "Смартфон з AMOLED-дисплеєм та камерою високої роздільної здатності.",
                    Price = 11999,
                    OldPrice = 13499,
                    Quantity = 35,
                    Rate = 4,
                    SoldPerMonth = 71,
                    AmountOfComments = 25,
                    BrandId = xiaomi.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Google Pixel 9 128GB",
                    Description = "Смартфон Google з чистою Android системою.",
                    Price = 29999,
                    OldPrice = 31999,
                    Quantity = 12,
                    Rate = 5,
                    SoldPerMonth = 23,
                    AmountOfComments = 8,
                    BrandId = google.Id,
                    CategoryId = smartphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "ASUS Vivobook 15",
                    Description = "Універсальний ноутбук для роботи та навчання.",
                    Price = 25999,
                    OldPrice = 27999,
                    Quantity = 13,
                    Rate = 4,
                    SoldPerMonth = 34,
                    AmountOfComments = 14,
                    BrandId = asus.Id,
                    CategoryId = laptops.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "ASUS TUF Gaming A15",
                    Description = "Ігровий ноутбук з потужною відеокартою.",
                    Price = 42999,
                    OldPrice = 45999,
                    Quantity = 8,
                    Rate = 5,
                    SoldPerMonth = 29,
                    AmountOfComments = 16,
                    BrandId = asus.Id,
                    CategoryId = laptops.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Lenovo IdeaPad Slim 3",
                    Description = "Легкий ноутбук для повсякденних задач.",
                    Price = 22999,
                    OldPrice = 24999,
                    Quantity = 16,
                    Rate = 4,
                    SoldPerMonth = 38,
                    AmountOfComments = 13,
                    BrandId = lenovo.Id,
                    CategoryId = laptops.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "MacBook Air 13 M3",
                    Description = "Тонкий ноутбук Apple на чипі M3.",
                    Price = 46999,
                    OldPrice = 49999,
                    Quantity = 10,
                    Rate = 5,
                    SoldPerMonth = 26,
                    AmountOfComments = 10,
                    BrandId = apple.Id,
                    CategoryId = laptops.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "iPad Air 11 M2",
                    Description = "Потужний планшет Apple для роботи та розваг.",
                    Price = 29999,
                    OldPrice = 31999,
                    Quantity = 15,
                    Rate = 5,
                    SoldPerMonth = 32,
                    AmountOfComments = 12,
                    BrandId = apple.Id,
                    CategoryId = tablets.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy Tab S9 FE",
                    Description = "Планшет Samsung з великим дисплеєм.",
                    Price = 19999,
                    OldPrice = 21999,
                    Quantity = 17,
                    Rate = 4,
                    SoldPerMonth = 37,
                    AmountOfComments = 14,
                    BrandId = samsung.Id,
                    CategoryId = tablets.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Huawei MatePad 11.5",
                    Description = "Планшет для навчання, роботи та мультимедіа.",
                    Price = 14999,
                    OldPrice = 16499,
                    Quantity = 20,
                    Rate = 4,
                    SoldPerMonth = 29,
                    AmountOfComments = 9,
                    BrandId = huawei.Id,
                    CategoryId = tablets.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple AirPods Pro 2",
                    Description = "Бездротові навушники з активним шумозаглушенням.",
                    Price = 10999,
                    OldPrice = 11999,
                    Quantity = 25,
                    Rate = 5,
                    SoldPerMonth = 82,
                    AmountOfComments = 31,
                    BrandId = apple.Id,
                    CategoryId = headphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy Buds3 Pro",
                    Description = "Преміальні бездротові навушники Samsung.",
                    Price = 8999,
                    OldPrice = 9999,
                    Quantity = 19,
                    Rate = 5,
                    SoldPerMonth = 51,
                    AmountOfComments = 19,
                    BrandId = samsung.Id,
                    CategoryId = headphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Sony WH-1000XM5",
                    Description = "Повнорозмірні навушники з якісним шумозаглушенням.",
                    Price = 13999,
                    OldPrice = 15499,
                    Quantity = 11,
                    Rate = 5,
                    SoldPerMonth = 44,
                    AmountOfComments = 17,
                    BrandId = sony.Id,
                    CategoryId = headphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "JBL Tune 770NC",
                    Description = "Бездротові навушники JBL з ANC.",
                    Price = 3999,
                    OldPrice = 4499,
                    Quantity = 28,
                    Rate = 4,
                    SoldPerMonth = 67,
                    AmountOfComments = 22,
                    BrandId = jbl.Id,
                    CategoryId = headphones.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple Watch Series 9",
                    Description = "Смарт-годинник Apple для спорту та повсякденного використання.",
                    Price = 16999,
                    OldPrice = 18499,
                    Quantity = 13,
                    Rate = 5,
                    SoldPerMonth = 35,
                    AmountOfComments = 13,
                    BrandId = apple.Id,
                    CategoryId = watches.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Galaxy Watch 7",
                    Description = "Сучасний смарт-годинник Samsung.",
                    Price = 12999,
                    OldPrice = 14499,
                    Quantity = 16,
                    Rate = 5,
                    SoldPerMonth = 41,
                    AmountOfComments = 15,
                    BrandId = samsung.Id,
                    CategoryId = watches.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung QLED 55 Q70D",
                    Description = "55-дюймовий QLED телевізор Samsung.",
                    Price = 39999,
                    OldPrice = 42999,
                    Quantity = 6,
                    Rate = 5,
                    SoldPerMonth = 18,
                    AmountOfComments = 7,
                    BrandId = samsung.Id,
                    CategoryId = tv.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "LG OLED 55 B4",
                    Description = "OLED телевізор LG з високою якістю зображення.",
                    Price = 44999,
                    OldPrice = 48999,
                    Quantity = 5,
                    Rate = 5,
                    SoldPerMonth = 15,
                    AmountOfComments = 6,
                    BrandId = lg.Id,
                    CategoryId = tv.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Sony Bravia 55 X90L",
                    Description = "Телевізор Sony Bravia з 4K HDR.",
                    Price = 42999,
                    OldPrice = 45999,
                    Quantity = 7,
                    Rate = 5,
                    SoldPerMonth = 17,
                    AmountOfComments = 8,
                    BrandId = sony.Id,
                    CategoryId = tv.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "ASUS TUF Gaming VG27AQ",
                    Description = "Ігровий монітор 27 дюймів з високою частотою оновлення.",
                    Price = 15999,
                    OldPrice = 17499,
                    Quantity = 12,
                    Rate = 5,
                    SoldPerMonth = 25,
                    AmountOfComments = 10,
                    BrandId = asus.Id,
                    CategoryId = monitors.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "LG UltraGear 27GP850",
                    Description = "Ігровий IPS монітор LG.",
                    Price = 16999,
                    OldPrice = 18499,
                    Quantity = 10,
                    Rate = 5,
                    SoldPerMonth = 21,
                    AmountOfComments = 9,
                    BrandId = lg.Id,
                    CategoryId = monitors.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung Odyssey G5 32",
                    Description = "Вигнутий ігровий монітор Samsung.",
                    Price = 13999,
                    OldPrice = 15499,
                    Quantity = 14,
                    Rate = 4,
                    SoldPerMonth = 24,
                    AmountOfComments = 11,
                    BrandId = samsung.Id,
                    CategoryId = monitors.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Apple MagSafe Charger",
                    Description = "Оригінальний бездротовий зарядний пристрій Apple.",
                    Price = 1999,
                    OldPrice = 2299,
                    Quantity = 40,
                    Rate = 5,
                    SoldPerMonth = 96,
                    AmountOfComments = 27,
                    BrandId = apple.Id,
                    CategoryId = accessories.Id
                },

                new ProductEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Samsung 25W Power Adapter",
                    Description = "Компактний зарядний пристрій Samsung.",
                    Price = 899,
                    OldPrice = 999,
                    Quantity = 55,
                    Rate = 5,
                    SoldPerMonth = 112,
                    AmountOfComments = 35,
                    BrandId = samsung.Id,
                    CategoryId = accessories.Id
                }
            };

            db.Products.AddRange(products);

            // ---------------------------------------------------------
            // PRODUCT ATTRIBUTES
            // ---------------------------------------------------------

            var attributes = new List<ProductAttributeEntity>();

            foreach (var product in products)
            {
                if (product.CategoryId == smartphones.Id)
                {
                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = diagonal.Id,
                        Value = product.Name.Contains("S24") ? "6.8\"" : "6.1\""
                    });

                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = processor.Id,
                        Value = product.Name.Contains("iPhone")
                            ? "Apple A16 Bionic"
                            : product.Name.Contains("S24")
                                ? "Snapdragon 8 Gen 3"
                                : "Snapdragon 7 Gen 3"
                    });

                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = ram.Id,
                        Value = "8 GB"
                    });

                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = storage.Id,
                        Value = product.Name.Contains("512GB")
                            ? "512 ГБ"
                            : product.Name.Contains("256GB")
                                ? "256 ГБ"
                                : "128 ГБ"
                    });

                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = os.Id,
                        Value = product.Name.Contains("iPhone")
                            ? "iOS"
                            : "Android"
                    });

                    attributes.Add(new ProductAttributeEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProductId = product.Id,
                        AttributeDefinitionId = color.Id,
                        Value = product.Name.Contains("Black")
                            ? "Black"
                            : "Titanium"
                    });
                }
            }

            db.ProductAttributes.AddRange(attributes);

            // ---------------------------------------------------------
            // MEDIA
            // ---------------------------------------------------------

            foreach (var product in products)
            {
                db.Media.Add(new MediaEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    ProductId = product.Id,
                    FileName = $"{product.Id}-main.jpg",
                    Url = $"https://placehold.co/800x800?text={Uri.EscapeDataString(product.Name)}",
                    Type = MediaType.Image,
                    ContentType = "image/jpeg",
                    Size = 150000,
                    DisplayOrder = 1
                });

                db.Media.Add(new MediaEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    ProductId = product.Id,
                    FileName = $"{product.Id}-second.jpg",
                    Url = $"https://placehold.co/800x800?text={Uri.EscapeDataString(product.Name + " 2")}",
                    Type = MediaType.Image,
                    ContentType = "image/jpeg",
                    Size = 175000,
                    DisplayOrder = 2
                });
            }

            // ---------------------------------------------------------
            // CARTS
            // ---------------------------------------------------------

            var cart1 = new CartEntity
            {
                Id = Guid.NewGuid().ToString(),
                UserId = john.Id,
                CreatedAt = DateTime.UtcNow.AddDays(-3)
            };

            var cart2 = new CartEntity
            {
                Id = Guid.NewGuid().ToString(),
                UserId = alex.Id,
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            };

            var cart3 = new CartEntity
            {
                Id = Guid.NewGuid().ToString(),
                UserId = michael.Id,
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            };

            db.Carts.AddRange(cart1, cart2, cart3);

            db.CartItems.AddRange(
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart1.Id,
                    ProductId = products[0].Id,
                    Quantity = 1
                },
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart1.Id,
                    ProductId = products[15].Id,
                    Quantity = 2
                },
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart1.Id,
                    ProductId = products[28].Id,
                    Quantity = 1
                },
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart2.Id,
                    ProductId = products[3].Id,
                    Quantity = 1
                },
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart2.Id,
                    ProductId = products[8].Id,
                    Quantity = 1
                },
                new CartItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    CartId = cart3.Id,
                    ProductId = products[17].Id,
                    Quantity = 2
                }
            );

            // ---------------------------------------------------------
            // FAVORITES
            // ---------------------------------------------------------

            db.Favorites.AddRange(
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = john.Id,
                    ProductId = products[0].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = john.Id,
                    ProductId = products[1].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = john.Id,
                    ProductId = products[15].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = alex.Id,
                    ProductId = products[3].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = alex.Id,
                    ProductId = products[8].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = michael.Id,
                    ProductId = products[12].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = david.Id,
                    ProductId = products[18].Id
                },
                new FavoriteEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = oliver.Id,
                    ProductId = products[20].Id
                }
            );

            // ---------------------------------------------------------
            // ORDERS
            // ---------------------------------------------------------

            var order1 = new OrderEntity
            {
                Id = Guid.NewGuid().ToString(),
                OrderNumber = "KTC-2026-0001",
                Date = DateTime.UtcNow.AddDays(-20),
                Status = "Completed",
                UserId = john.Id,
                TotalPrice = 41998,
                UsedBonuses = 500,
                DeliveryType = "pickup",
                City = "Рівне",
                Department = "Відділення №12",
                PaymentType = "cash"
            };

            var order2 = new OrderEntity
            {
                Id = Guid.NewGuid().ToString(),
                OrderNumber = "KTC-2026-0002",
                Date = DateTime.UtcNow.AddDays(-12),
                Status = "Completed",
                UserId = alex.Id,
                TotalPrice = 30999,
                UsedBonuses = 0,
                DeliveryType = "delivery",
                City = "Рівне",
                Address = "вул. Соборна, 25",
                PaymentType = "card"
            };

            var order3 = new OrderEntity
            {
                Id = Guid.NewGuid().ToString(),
                OrderNumber = "KTC-2026-0003",
                Date = DateTime.UtcNow.AddDays(-7),
                Status = "Processing",
                UserId = michael.Id,
                TotalPrice = 51999,
                UsedBonuses = 1000,
                DeliveryType = "pickup",
                City = "Львів",
                Department = "Відділення №8",
                PaymentType = "card"
            };

            var order4 = new OrderEntity
            {
                Id = Guid.NewGuid().ToString(),
                OrderNumber = "KTC-2026-0004",
                Date = DateTime.UtcNow.AddDays(-3),
                Status = "Created",
                UserId = james.Id,
                TotalPrice = 16999,
                UsedBonuses = 0,
                DeliveryType = "delivery",
                City = "Київ",
                Address = "вул. Хрещатик, 10",
                PaymentType = "cash"
            };

            var order5 = new OrderEntity
            {
                Id = Guid.NewGuid().ToString(),
                OrderNumber = "KTC-2026-0005",
                Date = DateTime.UtcNow.AddDays(-1),
                Status = "Created",
                UserId = david.Id,
                TotalPrice = 10999,
                UsedBonuses = 300,
                DeliveryType = "pickup",
                City = "Рівне",
                Department = "Відділення №4",
                PaymentType = "card"
            };

            db.Orders.AddRange(
                order1,
                order2,
                order3,
                order4,
                order5
            );

            // ---------------------------------------------------------
            // ORDER ITEMS
            // ---------------------------------------------------------

            db.OrderItems.AddRange(
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order1.Id,
                    ProductId = products[15].Id,
                    Quantity = 2,
                    Price = products[15].Price
                },
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order1.Id,
                    ProductId = products[28].Id,
                    Quantity = 1,
                    Price = products[28].Price
                },
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order2.Id,
                    ProductId = products[0].Id,
                    Quantity = 1,
                    Price = products[0].Price
                },
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order3.Id,
                    ProductId = products[4].Id,
                    Quantity = 1,
                    Price = products[4].Price
                },
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order4.Id,
                    ProductId = products[20].Id,
                    Quantity = 1,
                    Price = products[20].Price
                },
                new OrderItemEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order5.Id,
                    ProductId = products[15].Id,
                    Quantity = 1,
                    Price = products[15].Price
                }
            );

            // ---------------------------------------------------------
            // PROMO CODES
            // ---------------------------------------------------------

            var promoNew = new PromoCodeEntity
            {
                Id = Guid.NewGuid().ToString(),
                Code = "WELCOME10",
                DiscountValue = 10,
                IsPercentage = true,
                MinOrderAmount = 5000,
                MaxDiscountAmount = 3000,
                StartDate = DateTime.UtcNow.AddMonths(-2),
                EndDate = DateTime.UtcNow.AddMonths(2),
                MaxUsageCount = 1000,
                UsageCount = 14,
                IsActive = true
            };

            var promoKtc = new PromoCodeEntity
            {
                Id = Guid.NewGuid().ToString(),
                Code = "KTC500",
                DiscountValue = 500,
                IsPercentage = false,
                MinOrderAmount = 10000,
                StartDate = DateTime.UtcNow.AddMonths(-1),
                EndDate = DateTime.UtcNow.AddMonths(1),
                MaxUsageCount = 500,
                UsageCount = 27,
                IsActive = true
            };

            var promoSummer = new PromoCodeEntity
            {
                Id = Guid.NewGuid().ToString(),
                Code = "SUMMER15",
                DiscountValue = 15,
                IsPercentage = true,
                MinOrderAmount = 15000,
                MaxDiscountAmount = 5000,
                StartDate = DateTime.UtcNow.AddMonths(-1),
                EndDate = DateTime.UtcNow.AddMonths(1),
                MaxUsageCount = 300,
                UsageCount = 46,
                IsActive = true
            };

            var promoOld = new PromoCodeEntity
            {
                Id = Guid.NewGuid().ToString(),
                Code = "OLD20",
                DiscountValue = 20,
                IsPercentage = true,
                MinOrderAmount = 20000,
                MaxDiscountAmount = 4000,
                StartDate = DateTime.UtcNow.AddMonths(-6),
                EndDate = DateTime.UtcNow.AddMonths(-2),
                MaxUsageCount = 100,
                UsageCount = 100,
                IsActive = false
            };

            db.PromoCodes.AddRange(
                promoNew,
                promoKtc,
                promoSummer,
                promoOld
            );

            // ---------------------------------------------------------
            // PROMO USAGES
            // ---------------------------------------------------------

            db.PromoCodeUsages.AddRange(
                new PromoCodeUsageEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    PromoCodeId = promoNew.Id,
                    UserId = alex.Id,
                    OrderId = order2.Id,
                    DiscountAmount = 3000
                },
                new PromoCodeUsageEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    PromoCodeId = promoKtc.Id,
                    UserId = michael.Id,
                    OrderId = order3.Id,
                    DiscountAmount = 500
                }
            );

            // ---------------------------------------------------------
            // BONUSES
            // ---------------------------------------------------------

            var bonusOperations = new List<BonusEntity>
            {
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 1500,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення KTC-2026-0001",
                    UserId = john.Id,
                    OrderId = order1.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 500,
                    OperationType = BonusOperationType.Spent,
                    Description = "Використання бонусів у замовленні KTC-2026-0001",
                    UserId = john.Id,
                    OrderId = order1.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 1200,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення KTC-2026-0002",
                    UserId = alex.Id,
                    OrderId = order2.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 1000,
                    OperationType = BonusOperationType.Spent,
                    Description = "Використання бонусів у замовленні KTC-2026-0003",
                    UserId = michael.Id,
                    OrderId = order3.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 900,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення KTC-2026-0003",
                    UserId = michael.Id,
                    OrderId = order3.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 700,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення",
                    UserId = james.Id,
                    OrderId = order4.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 600,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення",
                    UserId = david.Id,
                    OrderId = order5.Id
                },
                new BonusEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Amount = 300,
                    OperationType = BonusOperationType.Spent,
                    Description = "Використання бонусів у замовленні",
                    UserId = david.Id,
                    OrderId = order5.Id
                }
            };

            db.Bonuses.AddRange(bonusOperations);

            // ---------------------------------------------------------
            // BONUS BALANCES
            // ---------------------------------------------------------

            john.BonusBalance = 3200;
            alex.BonusBalance = 1850;
            michael.BonusBalance = 2400;
            james.BonusBalance = 1100;
            david.BonusBalance = 1750;
            oliver.BonusBalance = 800;
            daniel.BonusBalance = 1250;

            // ---------------------------------------------------------
            // COMMENTS
            // ---------------------------------------------------------

            var comment1 = new CommentEntity
            {
                Id = Guid.NewGuid().ToString(),
                Text = "Користуюсь вже декілька тижнів. Телефон дуже швидкий, камера чудова.",
                RateOfProduct = 5,
                UserId = john.Id,
                ProductId = products[0].Id
            };

            var comment2 = new CommentEntity
            {
                Id = Guid.NewGuid().ToString(),
                Text = "За ці гроші дуже хороший смартфон. Батареї вистачає на цілий день.",
                RateOfProduct = 5,
                UserId = alex.Id,
                ProductId = products[0].Id
            };

            var comment3 = new CommentEntity
            {
                Id = Guid.NewGuid().ToString(),
                Text = "Екран просто топ, продуктивності вистачає для всіх задач.",
                RateOfProduct = 5,
                UserId = michael.Id,
                ProductId = products[4].Id
            };

            var comment4 = new CommentEntity
            {
                Id = Guid.NewGuid().ToString(),
                Text = "Хороший ноутбук для навчання. Тихий та легкий.",
                RateOfProduct = 4,
                UserId = james.Id,
                ProductId = products[8].Id
            };

            var comment5 = new CommentEntity
            {
                Id = Guid.NewGuid().ToString(),
                Text = "Навушники дуже зручні, шумозаглушення працює чудово.",
                RateOfProduct = 5,
                UserId = david.Id,
                ProductId = products[18].Id
            };

            db.Comments.AddRange(
                comment1,
                comment2,
                comment3,
                comment4,
                comment5
            );

            // ---------------------------------------------------------
            // COMMENT REPLIES
            // ---------------------------------------------------------

            db.Comments.AddRange(
                new CommentEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Text = "Дякую за відгук! Радий, що вам сподобався смартфон.",
                    RateOfProduct = 0,
                    UserId = users[7].Id,
                    ProductId = products[0].Id,
                    ParentCommentId = comment1.Id
                },
                new CommentEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Text = "Так, батарея реально добре тримає.",
                    RateOfProduct = 0,
                    UserId = john.Id,
                    ProductId = products[0].Id,
                    ParentCommentId = comment2.Id
                }
            );

            // ---------------------------------------------------------
            // NOTIFICATIONS
            // ---------------------------------------------------------

            db.Notifications.AddRange(
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "Ваше замовлення KTC-2026-0001 успішно отримано.",
                    IsRead = true,
                    UserId = john.Id,
                    Type = "Order"
                },
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "Ваше замовлення KTC-2026-0002 готове до отримання.",
                    IsRead = false,
                    UserId = alex.Id,
                    Type = "Order"
                },
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "Ваше замовлення KTC-2026-0003 передано в обробку.",
                    IsRead = false,
                    UserId = michael.Id,
                    Type = "Order"
                },
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "На ваш бонусний рахунок нараховано бонуси.",
                    IsRead = false,
                    UserId = john.Id,
                    Type = "Bonus"
                },
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "З'явився новий промокод WELCOME10.",
                    IsRead = false,
                    UserId = david.Id,
                    Type = "Promo"
                },
                new NotificationEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    Message = "Ваш коментар отримав відповідь.",
                    IsRead = false,
                    UserId = john.Id,
                    SenderId = users[7].Id,
                    Type = "Comment"
                }
            );

            // ---------------------------------------------------------
            // SAVE
            // ---------------------------------------------------------

            await db.SaveChangesAsync();
        }
    }
}