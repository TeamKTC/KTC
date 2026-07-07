namespace KTC.DAL.Entities
{
    public class CategoryEntity : BaseEntity
    {
        public string Name { get; set; } = default!;

        public virtual ICollection<ProductEntity> Products { get; set; } = [];
    }
}
