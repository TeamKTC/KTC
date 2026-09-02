using AutoMapper;
using KTC.BLL.Dto.Order;
using KTC.BLL.Dto.OrderItem;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Cart;
using KTC.DAL.Repositories.Order;
using KTC.DAL.Repositories.Product;
using KTC.DAL.Repositories.PromoCode;
using KTC.DAL.Repositories.User;
using System.Net;

namespace KTC.BLL.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IPromoCodeRepository _promoCodeRepository;

        public OrderService(
            IOrderRepository orderRepository,
            IMapper mapper,
            IUserRepository userRepository,
            ICartRepository cartRepository,
            IProductRepository productRepository,
            IPromoCodeRepository promoCodeRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _promoCodeRepository = promoCodeRepository;
        }

        public async Task<ServiceResponse> CreateAsync(
            CreateOrderDto dto,
            string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "Користувача не знайдено"
                };
            }

            var cart = await _cartRepository.GetUserCartAsync(userId);

            if (cart == null || cart.Items == null || !cart.Items.Any())
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Кошик порожній"
                };
            }

            if (dto.DeliveryType != "pickup" &&
                dto.DeliveryType != "nova" &&
                dto.DeliveryType != "courier")
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Некоректний тип доставки"
                };
            }

            if (dto.DeliveryType != "pickup" &&
                string.IsNullOrWhiteSpace(dto.City))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Оберіть місто"
                };
            }

            if (dto.DeliveryType == "nova" &&
                string.IsNullOrWhiteSpace(dto.Department))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Оберіть відділення Нової пошти"
                };
            }

            if (dto.DeliveryType == "courier" &&
                string.IsNullOrWhiteSpace(dto.Address))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Вкажіть адресу доставки"
                };
            }

            if (dto.PaymentType != "cash" &&
                dto.PaymentType != "card" &&
                dto.PaymentType != "installment")
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Некоректний тип оплати"
                };
            }

            if (dto.PaymentType == "installment" &&
                string.IsNullOrWhiteSpace(dto.InstallmentBank))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Оберіть банк для розстрочки"
                };
            }

            var orderItems = new List<OrderItemEntity>();
            decimal productsTotal = 0;

            foreach (var cartItem in cart.Items)
            {
                if (cartItem.Quantity <= 0)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Некоректна кількість товару"
                    };
                }

                var product = await _productRepository
                    .GetByIdAsync(cartItem.ProductId);

                if (product == null)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.NotFound,
                        Message =
                            $"Товар з id {cartItem.ProductId} не знайдено"
                    };
                }

                if (product.Quantity < cartItem.Quantity)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message =
                            $"Недостатньо товару \"{product.Name}\". " +
                            $"Доступно: {product.Quantity}, " +
                            $"потрібно: {cartItem.Quantity}"
                    };
                }

                var price = product.Price;

                productsTotal += price * cartItem.Quantity;

                orderItems.Add(new OrderItemEntity
                {
                    ProductId = product.Id,
                    Quantity = cartItem.Quantity,
                    Price = price
                });

                product.Quantity -= cartItem.Quantity;
                product.SoldPerMonth += cartItem.Quantity;

                await _productRepository.UpdateAsync(product);
            }

            decimal promoDiscount = 0;
            PromoCodeEntity? promoCode = null;

            if (!string.IsNullOrWhiteSpace(dto.PromoCodeId))
            {
                promoCode = await _promoCodeRepository
                    .GetByIdAsync(dto.PromoCodeId);

                if (promoCode == null)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Промокод не знайдено"
                    };
                }

                if (!promoCode.IsActive)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Промокод неактивний"
                    };
                }

                var alreadyUsed =
                    await _promoCodeRepository.HasUserUsedPromoCodeAsync(
                        promoCode.Id,
                        userId);

                if (alreadyUsed)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Ви вже використовували цей промокод"
                    };
                }

                var now = DateTime.UtcNow;

                if (promoCode.StartDate.HasValue &&
                    now < promoCode.StartDate.Value)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Промокод ще не діє"
                    };
                }

                if (promoCode.EndDate.HasValue &&
                    now > promoCode.EndDate.Value)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Термін дії промокоду закінчився"
                    };
                }

                if (promoCode.MaxUsageCount.HasValue &&
                    promoCode.UsageCount >= promoCode.MaxUsageCount.Value)
                {
                    return new ServiceResponse
                    {
                        IsSuccess = false,
                        StatusCode = HttpStatusCode.BadRequest,
                        Message = "Промокод більше недоступний"
                    };
                }

                if (promoCode.IsPercentage)
                {
                    promoDiscount =
                        productsTotal *
                        promoCode.DiscountValue /
                        100;

                    if (promoCode.MaxDiscountAmount.HasValue)
                    {
                        promoDiscount = Math.Min(
                            promoDiscount,
                            promoCode.MaxDiscountAmount.Value);
                    }
                }
                else
                {
                    promoDiscount = promoCode.DiscountValue;
                }

                promoDiscount = Math.Min(
                    promoDiscount,
                    productsTotal);
            }

            var usedBonuses = Math.Max(0, dto.UsedBonuses);

            if (usedBonuses > user.BonusBalance)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Недостатньо бонусів"
                };
            }

            var afterPromo = Math.Max(
                0,
                productsTotal - promoDiscount);

            usedBonuses = Math.Min(
                usedBonuses,
                (int)Math.Floor(afterPromo));

            var finalPrice = Math.Max(
                0,
                afterPromo - usedBonuses);

            var earnedBonuses = (int)Math.Floor(
                finalPrice * 0.01m);

            var order = new OrderEntity
            {
                OrderNumber =
                    $"ORD-{DateTime.UtcNow:yyyyMMddHHmmssfff}",

                Date = DateTime.UtcNow,

                Status = "Pending",

                UserId = userId,

                User = user,

                TotalPrice = finalPrice,

                UsedBonuses = usedBonuses,

                PromoDiscount = promoDiscount,

                PromoCodeId = promoCode?.Id,

                PromoCode = promoCode,

                DeliveryType = dto.DeliveryType,

                City = dto.City,

                Department = dto.Department,

                Address = dto.Address,

                PaymentType = dto.PaymentType,

                InstallmentBank = dto.InstallmentBank,

                Comment = string.IsNullOrWhiteSpace(dto.Comment)
                    ? null
                    : dto.Comment.Trim()
            };

            foreach (var item in orderItems)
            {
                item.Order = order;
                order.Items.Add(item);
            }

            await _orderRepository.CreateOrderWithItemsAsync(
                order,
                orderItems);

            if (usedBonuses > 0)
            {
                user.BonusBalance -= usedBonuses;

                await _userRepository.UpdateAsync(user);

                var spentBonus = new BonusEntity
                {
                    Amount = usedBonuses,
                    OperationType = BonusOperationType.Spent,
                    Description = "Використання бонусів при покупці",
                    UserId = userId,
                    User = user,
                    OrderId = order.Id,
                    Order = order
                };

                await _userRepository.AddBonusAsync(spentBonus);
            }

            if (earnedBonuses > 0)
            {
                user.BonusBalance += earnedBonuses;

                await _userRepository.UpdateAsync(user);

                var earnedBonus = new BonusEntity
                {
                    Amount = earnedBonuses,
                    OperationType = BonusOperationType.Earned,
                    Description = "Бонуси за оформлення замовлення",
                    UserId = userId,
                    User = user,
                    OrderId = order.Id,
                    Order = order
                };

                await _userRepository.AddBonusAsync(earnedBonus);
            }

            if (promoCode != null)
            {
                promoCode.UsageCount++;

                await _promoCodeRepository.UpdateAsync(promoCode);

                var promoCodeUsage = new PromoCodeUsageEntity
                {
                    PromoCodeId = promoCode.Id,
                    UserId = userId,
                    OrderId = order.Id,
                    DiscountAmount = promoDiscount
                };

                await _promoCodeRepository.AddUsageAsync(
                    promoCodeUsage);
            }

            cart.Items.Clear();

            await _cartRepository.UpdateAsync(cart);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Замовлення успішно оформлено",
                Payload = new
                {
                    orderId = order.Id,
                    orderNumber = order.OrderNumber,
                    productsTotal,
                    promoDiscount,
                    usedBonuses,
                    earnedBonuses,
                    totalPrice = finalPrice
                }
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _orderRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Замовлення з id {id} не знайдено"
                };
            }

            await _orderRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Замовлення успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllOrders()
        {
            var orders = _orderRepository.GetAll();

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderDto>>(orders)
            };
        }

        public async Task<ServiceResponse> GetOrderById(string orderId)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);

            if (order == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "Замовлення не знайдено"
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<OrderDto>(order)
            };
        }

        public async Task<ServiceResponse> GetOrderItemsByOrderId(
            string orderId)
        {
            var items = await _orderRepository
                .GetOrderItemsByOrderId(orderId);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderItemDto>>(items)
            };
        }

        public async Task<ServiceResponse> GetOrdersByUserId(
            string userId)
        {
            var orders = await _orderRepository
                .GetOrdersByUserId(userId);

            var result = orders.Select(order => new
            {
                id = order.Id,
                orderNumber = order.OrderNumber,
                date = order.Date,
                status = order.Status,
                totalPrice = order.TotalPrice
            }).ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = result
            };
        }

        public async Task<ServiceResponse> UpdateAsync(
            UpdateOrderDto dto)
        {
            var entity = await _orderRepository.GetByIdAsync(dto.Id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message =
                        $"Замовлення з id {dto.Id} не знайдено"
                };
            }

            entity = _mapper.Map(dto, entity);

            await _orderRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Замовлення успішно оновлено"
            };
        }
    }
}