
using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Comment
{
    public class CommentRepository : GenericRepository<CommentEntity>, ICommentRepository
    {
        public CommentRepository(AppDbContext context) : base(context){}
        public Task<List<CommentEntity>> GetByProductID(string productId)
        {
            return _context.Comments
                .Where(c => c.ProductId == productId)
                .ToListAsync();
        }
        public Task<List<CommentEntity>> GetByUserID(string userId)
        {
            return _context.Comments
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }
        public Task<List<CommentEntity>> GetRepliesByCommentID(string commentId)
        {
            return _context.Comments
                .Where(c => c.ParentCommentId == commentId)
                .ToListAsync();
        }
    }
}
