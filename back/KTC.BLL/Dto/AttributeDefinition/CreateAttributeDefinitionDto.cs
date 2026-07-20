namespace KTC.BLL.Dto.AttributeDefinition
{
    public class CreateAttributeDefinitionDto
    {
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
