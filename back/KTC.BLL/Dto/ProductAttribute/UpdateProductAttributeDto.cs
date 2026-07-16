namespace KTC.BLL.Dto.ProductAttribute
{
    public class UpdateProductAttributeDto
    {
        public string Id { get; set; } = null!;
        public string ProductId { get; set; } = null!;
        public string AttributeDefinitionId { get; set; } = null!;
        public string Value { get; set; } = null!;
    }
}
