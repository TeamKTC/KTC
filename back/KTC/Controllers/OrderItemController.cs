using KTC.BLL.Dto.OrderItem;
using KTC.BLL.Services.OrderItem;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/order-item")]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItemService _orderItemService;
        public OrderItemController(IOrderItemService orderItemService)
        {
            _orderItemService = orderItemService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrderItem([FromBody] CreateOrderItemDto orderItemDto)
        {
            var response = await _orderItemService.CreateAsync(orderItemDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateOrderItem([FromBody] UpdateOrderItemDto orderItemDto)
        {
            var response = await _orderItemService.UpdateAsync(orderItemDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteOrderItem([FromQuery] string orderItemId)
        {
            var response = await _orderItemService.DeleteAsync(orderItemId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrderItems()
        {
            var response = await _orderItemService.GetAllOrderItems();
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetOrderItemById([FromQuery] string orderItemId)
        {
            var response = await _orderItemService.GetOrderItemById(orderItemId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-order-id")]
        public async Task<IActionResult> GetOrdersItemsByOrderId([FromQuery] string orderId)
        {
            var response = await _orderItemService.GetOrdersItemsByOrderId(orderId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-product-id")]
        public async Task<IActionResult> GetOrdersItemsByProductId([FromQuery] string productId)
        {
            var response = await _orderItemService.GetOrdersItemsByProductId(productId);
            return this.ToActionResult(response);
        }
    }
}
