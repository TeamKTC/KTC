

using AutoMapper;
using KTC.BLL.Dto.Category;
using KTC.BLL.Dto.Comment;
using KTC.BLL.Dto.Product;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Comment;
using KTC.DAL.Repositories.Product;
using Microsoft.VisualBasic;
using System.Net;

namespace KTC.BLL.Services.Comment
{
    public class CommentService : ICommentService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        public CommentService(ICommentRepository commentRepository, IMapper mapper, IProductRepository productRepository)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _productRepository = productRepository;
        }
        public async Task<ServiceResponse> CreateAsync(CreateCommentDto dto)
        {
            var entity = _mapper.Map<CommentEntity>(dto);
            var product = await _productRepository.GetByIdAsync(dto.ProductId);
            var parentComment = await _commentRepository.GetByIdAsync(dto.ParentCommentId) ?? null;

            if (product == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Product з id '{dto.ProductId}' не знайдено"
                };
            }
            entity.Product = product;
            entity.ParentComment = parentComment;

            await _commentRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Коментар успішно створено",
                Payload = entity
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _commentRepository.GetByIdAsync(id);
            if(entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Коментар з id '{id}' не знайдено"
                };

            }

            await _commentRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментар успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllComments()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментарі успішно отримано",
                Payload = _mapper.Map<List<CommentDto>>(_commentRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetByProductID(string productId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментарі успішно отримано",
                Payload = _mapper.Map<CommentDto>(_commentRepository.GetByProductID(productId)) ?? null
            };
        }

        public async Task<ServiceResponse> GetByUserID(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse> GetCommentById(string commentId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментар успішно отримано",
                Payload = _mapper.Map<CommentDto>(_commentRepository.GetByIdAsync(commentId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetRepliesByCommentID(string commentId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Відповіді на коментар успішно отримано",
                Payload = _mapper.Map<List<CommentDto>>(_commentRepository.GetRepliesByCommentID(commentId)) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateCommentDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
