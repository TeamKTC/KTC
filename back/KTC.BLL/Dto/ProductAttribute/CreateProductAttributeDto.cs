using KTC.DAL.Entities;

namespace KTC.BLL.Dto.ProductAttribute
{
    public class CreateProductAttributeDto
    {
        public string ProductId { get; set; } = null!;
        public string AttributeDefinitionId { get; set; } = null!;
        public string Value { get; set; } = null!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
