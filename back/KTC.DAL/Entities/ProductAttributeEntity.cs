namespace KTC.DAL.Entities
{
    public class ProductAttributeEntity : BaseEntity
    {
        public string ProductId { get; set; } = null!;
        public ProductEntity Product { get; set; } = null!;
        public string AttributeDefinitionId { get; set; } = null!;
        public AttributeDefinitionEntity AttributeDefinition { get; set; } = null!;

        public string Value { get; set; } = null!;
    }
}
