using AutoMapper;
using KTC.BLL.Dto.OrderItem;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Order;
using KTC.DAL.Repositories.OrderItem;
using KTC.DAL.Repositories.Product;
using KTC.DAL.Repositories.User;

namespace KTC.BLL.Services.OrderItem
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public OrderItemService(IOrderItemRepository orderItemRepository, IMapper mapper,
            IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _mapper = mapper;
            _orderItemRepository = orderItemRepository;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        public async Task<ServiceResponse> CreateAsync(CreateOrderItemDto dto)
        {
            var entity = _mapper.Map<OrderItemEntity>(dto);
            var order = _orderRepository.GetByIdAsync(dto.OrderId).Result;
            var product = _productRepository.GetByIdAsync(dto.ProductId).Result;

            if (order == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Order з id {dto.OrderId} не знайдено",
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };

            }

            if (product == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Product з id {dto.OrderId} не знайдено",
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }

            entity.Order = order;
            entity.Product = product;

            await _orderItemRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItem успішно створено",
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _orderItemRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"OrderItem з id {id} не знайдено",
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };

            }
            
            await _orderItemRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItem успішно видалено",
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetAllOrderItems()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItems успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderItemDto>>( _orderItemRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrderItemById(string orderItemId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItem успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<OrderItemDto>(await _orderItemRepository.GetByIdAsync(orderItemId)) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrdersItemsByOrderId(string orderId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItems успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderItemDto>>(await _orderItemRepository.GetOrdersItemsByOrderId(orderId)) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrdersItemsByProductId(string productId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItems успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderItemDto>>(await _orderItemRepository.GetOrdersItemsByProductId(productId)) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateOrderItemDto dto)
        {
            var entity = await _orderItemRepository.GetByIdAsync(dto.Id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"OrderItem з id {dto.Id} не знайдено",
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };
            }

            var order = await _orderRepository.GetByIdAsync(dto.OrderId);
            var product = await _productRepository.GetByIdAsync(dto.ProductId);

            if (product == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Product з id {dto.ProductId} не знайдено",
                    StatusCode = System.Net.HttpStatusCode.BadRequest
                };

            }

            entity = _mapper.Map(dto, entity);

            entity.Order = order;
            entity.Product = product;

            await _orderItemRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "OrderItem успішно оновлено",
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }
    }
}
