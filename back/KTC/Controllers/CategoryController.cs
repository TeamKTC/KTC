using KTC.BLL.Dto.Category;
using KTC.BLL.Services.Catagory;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto categoryDto)
        {
            var response = await _categoryService.CreateAsync(categoryDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryDto categoryDto)
        {
            var response = await _categoryService.UpdateAsync(categoryDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory([FromQuery] string categoryId)
        {
            var response = await _categoryService.DeleteAsync(categoryId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var response = await _categoryService.GetAllCategories();
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetCategoryById([FromQuery] string categoryId)
        {
            var response = await _categoryService.GetCategoryById(categoryId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-name")]
        public async Task<IActionResult> GetCategoryByName([FromQuery] string categoryName)
        {
            var response = await _categoryService.GetCategoryByName(categoryName);
            return this.ToActionResult(response);
        }
        [HttpGet("products-by-category-name")]
        public async Task<IActionResult> GetProductsByCategoryName([FromQuery] string categoryName)
        {
            var response = await _categoryService.GetProductsByCategoryName(categoryName);
            return this.ToActionResult(response);
        }
    }
}
