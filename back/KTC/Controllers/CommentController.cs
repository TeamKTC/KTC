using KTC.BLL.Dto.Comment;
using KTC.BLL.Services.Comment;
using KTC.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace KTC.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto commentDto)
        {
            var response = await _commentService.CreateAsync(commentDto);
            return this.ToActionResult(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentDto commentDto)
        {
            var response = await _commentService.UpdateAsync(commentDto);
            return this.ToActionResult(response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteComment([FromQuery] string commentId)
        {
            var response = await _commentService.DeleteAsync(commentId);
            return this.ToActionResult(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            var response = await _commentService.GetAllComments();
            return this.ToActionResult(response);
        }
        [HttpGet("by-id")]
        public async Task<IActionResult> GetComment([FromQuery] string commentId)
        {
            var response = await _commentService.GetCommentById(commentId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-product-id")]
        public async Task<IActionResult> GetCommentByProductId([FromQuery] string productId)
        {
            var response = await _commentService.GetByProductID(productId);
            return this.ToActionResult(response);
        }
        [HttpGet("by-user-id")]
        public async Task<IActionResult> GetCommentByUserId([FromQuery] string userId)
        {
            var response = await _commentService.GetByUserID(userId);
            return this.ToActionResult(response);
        }
        [HttpGet("replies")]
        public async Task<IActionResult> GetRepliesByCommentId([FromQuery] string commentId)
        {
            var response = await _commentService.GetRepliesByCommentID(commentId);
            return this.ToActionResult(response);
        }
    }
}
