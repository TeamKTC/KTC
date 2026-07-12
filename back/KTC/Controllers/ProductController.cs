using KTC.BLL.Dto.Product;
using KTC.BLL.Services.Product;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto productDto)
        {
            var response = await _productService.CreateAsync(productDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductDto productDto)
        {
            var response = await _productService.UpdateAsync(productDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProduct([FromQuery] string productId)
        {
            var response = await _productService.DeleteAsync(productId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var response = await _productService.GetAllProducts();
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetProduct([FromQuery] string productId)
        {
            var response = await _productService.GetProductById(productId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-name")]
        public async Task<IActionResult> GetProductByName([FromQuery] string productName)
        {
            var response = await _productService.GetProductByName(productName);
            return this.ToActionResult(response);
        }
        [HttpGet("by-price-range")]
        public async Task<IActionResult> GetProductByPriceRange([FromQuery] int min, [FromQuery] int max)
        {
            var response = await _productService.GetProductByPriceRange(min, max);
            return this.ToActionResult(response);
        }
    }
}
