namespace KTC.BLL.Dto.Category
{
    public class CreateCategoryDto
    {
        public string Name { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
