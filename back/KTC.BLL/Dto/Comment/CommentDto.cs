using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Comment
{
    public class CommentDto
    {
        public string Id { get; set; } = default!;
        public string Text { get; set; } = default!;

        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;

        public string ProductId { get; set; }
        public ProductEntity Product { get; set; } = default!;

        public string? ParentCommentId { get; set; }
        public CommentEntity? ParentComment { get; set; }

        public ICollection<CommentEntity> Replies { get; set; } = new List<CommentEntity>();
    }
}
