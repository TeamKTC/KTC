using KTC.BLL.Dto.AttributeDefinition;
using KTC.BLL.Services.AttributeDefinition;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/attribute-definition")]
    public class AttributeDefinitionController : ControllerBase 
    {
        private readonly IAttibuteDefinitionService _attributeDefinitionService;
        public AttributeDefinitionController(IAttibuteDefinitionService attibuteDefinitionService)
        {
            _attributeDefinitionService = attibuteDefinitionService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateAttributeDefinition([FromBody] CreateAttributeDefinitionDto attributeDefinitionDto)
        {
            var response = await _attributeDefinitionService.CreateAsync(attributeDefinitionDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateAttributeDefinition([FromBody] UpdateAttributeDefinitionDto attributeDefinitionDto)
        {
            var response = await _attributeDefinitionService.UpdateAsync(attributeDefinitionDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAttributeDefinition([FromQuery] string attributeDefinitionId)
        {
            var response = await _attributeDefinitionService.DeleteAsync(attributeDefinitionId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetAttributeDefinitionById([FromQuery] string attributeDefinitionId)
        {
            var response = await _attributeDefinitionService.GetAttributeDefinitionById(attributeDefinitionId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAttributeDefinitions()
        {
            var response = await _attributeDefinitionService.GetAllAtributeDefinitions();
            return this.ToActionResult(response);
        }
        [HttpGet("by-name")]
        public async Task<IActionResult> GetAttributeDefinitionByName([FromQuery] string attributeDefinitionName)
        {
            var response = await _attributeDefinitionService.GetByName(attributeDefinitionName);
            return this.ToActionResult(response);
        }
        [HttpGet("by-product-id")]
        public async Task<IActionResult> GetAttributeDefinitionsByProductId([FromQuery] string productId)
        {
            var response = await _attributeDefinitionService.GetByProductId(productId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-type")]
        public async Task<IActionResult> GetAttributeDefinitionsByType([FromQuery] string attributeType)
        {
            var response = await _attributeDefinitionService.GetByType(attributeType);
            return this.ToActionResult(response);
        }
    }
}
