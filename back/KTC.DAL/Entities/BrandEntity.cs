namespace KTC.DAL.Entities
{
    public class BrandEntity : BaseEntity
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public ICollection<ProductEntity> Products { get; set; } = [];
    }
}
