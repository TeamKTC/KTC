using KTC.BLL.Dto.ProductAttribute;
using KTC.BLL.Services.ProductAttribute;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/product-attribute")]
    public class ProductAttributeController : ControllerBase
    {
        private readonly IProductAttributeService _productAttributeService;
        public ProductAttributeController(IProductAttributeService productAttributeService)
        {
            _productAttributeService = productAttributeService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateProductAttribute([FromBody] CreateProductAttributeDto productAttributeDto)
        {
            var response = await _productAttributeService.CreateAsync(productAttributeDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProductAttribute([FromBody] UpdateProductAttributeDto productAttributeDto)
        {
            var response = await _productAttributeService.UpdateAsync(productAttributeDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProductAttribute([FromQuery] string productAttributeId)
        {
            var response = await _productAttributeService.DeleteAsync(productAttributeId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetProductAttributeById([FromQuery] string productAttributeId)
        {
            var response = await _productAttributeService.GetProductAttributeById(productAttributeId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProductAttributes()
        {
            var response = await _productAttributeService.GetAllAtributes();
            return this.ToActionResult(response);
        }
        [HttpGet("by-product-id")]
        public async Task<IActionResult> GetProductAttributesByProductId([FromQuery] string productId)
        {
            var response = await _productAttributeService.GetByProductId(productId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-attribute-definition-id")]
        public async Task<IActionResult> GetProductAttributesByAttributeDefinitionId([FromQuery] string attributeDefinitionId)
        {
            var response = await _productAttributeService.GetByAttributeDefinitionId(attributeDefinitionId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-range-of-value")]
        public async Task<IActionResult> GetProductAttributesByRangeOfValue([FromQuery] string attributeDefinitionId, [FromQuery] int min, [FromQuery] int max)
        {
            var response = await _productAttributeService.GetByRangeOfValue(attributeDefinitionId, min, max);
            return this.ToActionResult(response);
        }
        [HttpGet("by-string-value")]
        public async Task<IActionResult> GetProductAttributesByStringValue([FromQuery] string attributeDefinitionId, [FromQuery] string value)
        {
            var response = await _productAttributeService.GetByStringValue(attributeDefinitionId, value);
            return this.ToActionResult(response);
        }
    }
}
