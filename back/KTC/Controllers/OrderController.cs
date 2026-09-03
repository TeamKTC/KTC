using KTC.BLL.Dto.Order;
using KTC.BLL.Services.Order;
using KTC.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(
            [FromBody] CreateOrderDto orderDto)
        {
            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var response = await _orderService.CreateAsync(
                orderDto,
                userId);

            return this.ToActionResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrder(
            [FromBody] UpdateOrderDto orderDto)
        {
            var response =
                await _orderService.UpdateAsync(orderDto);

            return this.ToActionResult(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(
            [FromQuery] string orderId)
        {
            var response =
                await _orderService.DeleteAsync(orderId);

            return this.ToActionResult(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var response =
                await _orderService.GetAllOrders();

            return this.ToActionResult(response);
        }

        [HttpGet("by-id")]
        public async Task<IActionResult> GetOrderById(
            [FromQuery] string orderId)
        {
            var response =
                await _orderService.GetOrderById(orderId);

            return this.ToActionResult(response);
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var response =
                await _orderService.GetOrdersByUserId(userId);

            return this.ToActionResult(response);
        }

        [HttpGet("by-user-id")]
        public async Task<IActionResult> GetOrdersByUserId(
            [FromQuery] string userId)
        {
            var response =
                await _orderService.GetOrdersByUserId(userId);

            return this.ToActionResult(response);
        }

        [HttpGet("order-items")]
        public async Task<IActionResult> GetOrderItemsByOrderId(
            [FromQuery] string orderId)
        {
            var response =
                await _orderService.GetOrderItemsByOrderId(orderId);

            return this.ToActionResult(response);
        }
    }
}