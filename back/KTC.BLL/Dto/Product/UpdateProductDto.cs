using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Product
{
    public class UpdateProductDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int Rate { get; set; }
        public int SoldPerMonth { get; set; }
        public int AmountOfComments { get; set; }
        public string CategoryId { get; set; } = default!;
        public string BrandId { get; set; } = default!;
    }
}
