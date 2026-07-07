namespace KTC.BLL.Dto.Category
{
    public class CategoryDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
