using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Comment
{
    public class UpdateCommentDto
    {
        public string Id { get; set; } = default!;
        public string Text { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public string ProductId { get; set; }

        public string? ParentCommentId { get; set; }
    }
}
