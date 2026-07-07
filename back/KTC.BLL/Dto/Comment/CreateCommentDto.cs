namespace KTC.BLL.Dto.Comment
{
    public class CreateCommentDto
    {
        public string Text { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public string ProductId { get; set; }

        public string? ParentCommentId { get; set; }
        public DateTime ReleaseDate { get; internal set; }
    }
}
