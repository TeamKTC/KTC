namespace KTC.DAL.Entities
{
    public class AttributeDefinitionEntity : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public ICollection<ProductAttributeEntity> ProductAttributes { get; set; } = new List<ProductAttributeEntity>();
    }
}
