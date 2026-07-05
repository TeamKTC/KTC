using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Comment
{
    public interface ICommentRepository : IGenericRepository<CommentEntity>
    {
        Task<List<CommentEntity>> GetByUserID(string userId);
        Task<List<CommentEntity>> GetByProductID(string productId);
        Task<List<CommentEntity>> GetRepliesByCommentID(string commentId);
    }
}
