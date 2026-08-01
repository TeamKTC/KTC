using KTC.DAL.Entities;
using Microsoft.AspNetCore.Http;
namespace KTC.BLL.Dto.Product
{
    public class CreateProductDto
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int Rate { get; set; }
        public int SoldPerMonth { get; set; }

        public string CategoryId { get; set; } = default!;
        public string BrandId { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
        public List<IFormFile> Files { get; set; } = [];
    }
}
