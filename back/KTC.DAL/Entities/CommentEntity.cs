using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class CommentEntity : BaseEntity
    {
        public string Text { get; set; } = default!;
        public int RateOfProduct { get; set; }

        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;

        public string? ProductId { get; set; }
        public ProductEntity Product { get; set; } = default!;

        public string? ParentCommentId { get; set; }
        public CommentEntity? ParentComment { get; set; }

        public ICollection<CommentEntity> Replies { get; set; } = new List<CommentEntity>();
    }
}
