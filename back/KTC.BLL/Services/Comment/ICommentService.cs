
using KTC.BLL.Dto.Comment;

namespace KTC.BLL.Services.Comment
{
    public interface ICommentService
    {
        Task<ServiceResponse> CreateAsync(CreateCommentDto dto);
        Task<ServiceResponse> UpdateAsync(UpdateCommentDto dto);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> GetCommentById(string commentId);
        Task<ServiceResponse> GetAllComments();
        Task<ServiceResponse> GetByUserID(string userId);
        Task<ServiceResponse> GetByProductID(string productId);
        Task<ServiceResponse> GetRepliesByCommentID(string commentId);
    }
}
