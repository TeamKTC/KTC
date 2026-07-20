using KTC.DAL.Entities;

namespace KTC.BLL.Dto.ProductAttribute
{
    public class ProductAttributeDto
    {
        public string Id { get; set; } = null!;
        public string ProductId { get; set; } = null!;
        public ProductEntity Product { get; set; } = null!;
        public string AttributeDefinitionId { get; set; } = null!;
        public AttributeDefinitionEntity AttributeDefinition { get; set; } = null!;
        public string Value { get; set; } = null!;
    }
}
