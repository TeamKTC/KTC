using AutoMapper;
using KTC.BLL.Dto.Order;
using KTC.BLL.Dto.OrderItem;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Order;
using KTC.DAL.Repositories.User;
using Microsoft.VisualBasic;
using System.Net;

namespace KTC.BLL.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public OrderService(IOrderRepository orderRepository, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        public async Task<ServiceResponse> CreateAsync(CreateOrderDto dto)
        {
            var entity = _mapper.Map<OrderEntity>(dto);

            var user = _userRepository.GetByIdAsync(dto.UserId).Result;

            if (user == null) {
                return new ServiceResponse
                {
                    Message = $"User з id {dto.UserId} не знайдено",
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound
                };
            }

            entity.User = user;

            await _orderRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Замовлення успішно додано"
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = _orderRepository.GetByIdAsync(id).Result;

            if (entity == null)
            {
                return new ServiceResponse
                {
                    Message = $"Замовлення з id {id} не знайдено",
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound
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
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderDto>>(_orderRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrderById(string orderId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<OrderDto>(_orderRepository.GetByIdAsync(orderId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrderItemsByOrderId(string orderId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderItemDto>>(_orderRepository.GetOrderItemsByOrderId(orderId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetOrdersByUserId(string userId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<OrderDto>>(_orderRepository.GetOrdersByUserId(userId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateOrderDto dto)
        {
            var entity = _orderRepository.GetByIdAsync(dto.Id).Result;

            if (entity == null)
            {
                return new ServiceResponse
                {
                    Message = $"Замовлення з id {dto.Id} не знайдено",
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound
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
