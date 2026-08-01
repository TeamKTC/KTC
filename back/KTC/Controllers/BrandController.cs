using KTC.BLL.Dto.Brand;
using KTC.BLL.Services.Brand;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/brand")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateBrand([FromForm] CreateBrandDto dto)
        {
            var response = await _brandService.CreateAsync(dto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateBrand([FromForm] UpdateBrandDto dto)
        {
            var response = await _brandService.UpdateAsync(dto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteBrand([FromQuery] string brandId)
        {
            var response = await _brandService.DeleteAsync(brandId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBrands()
        {
            var response = await _brandService.GetAllBrands();
            return this.ToActionResult(response);

        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetBrandById([FromQuery] string brandId)
        {
            var response = await _brandService.GetByIdAsync(brandId);
            return this.ToActionResult(response);
        }
        [HttpGet("all-products")]
        public async Task<IActionResult> GetAllProductsByBrandId([FromQuery] string brandId)
        {
            var response = await _brandService.GetAllProductsByBeandId(brandId);
            return this.ToActionResult(response);
        }
    }
}
