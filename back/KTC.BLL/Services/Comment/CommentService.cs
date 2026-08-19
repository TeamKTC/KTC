

using AutoMapper;
using KTC.BLL.Dto.Category;
using KTC.BLL.Dto.Comment;
using KTC.BLL.Dto.Product;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Comment;
using KTC.DAL.Repositories.Product;
using KTC.DAL.Repositories.User;
using Microsoft.VisualBasic;
using System.Net;

namespace KTC.BLL.Services.Comment
{
    public class CommentService : ICommentService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public CommentService(ICommentRepository commentRepository, IMapper mapper, IProductRepository productRepository, IUserRepository userRepository)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }
        public async Task<ServiceResponse> CreateAsync(CreateCommentDto dto)
        {
            var entity = _mapper.Map<CommentEntity>(dto);
            var product = await _productRepository.GetByIdAsync(dto.ProductId);
            var parentComment = await _commentRepository.GetByIdAsync(dto.ParentCommentId) ?? null;
            var user = await _userRepository.GetByIdAsync(dto.UserId);

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
            entity.User = user;

            await _commentRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Коментар успішно створено"
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
            var entities = await _commentRepository.GetByProductID(productId);
            List<CommentDto> dtos = _mapper.Map<List<CommentDto>>(entities);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментарі успішно отримано",
                Payload = dtos
            };
        }

        public async Task<ServiceResponse> GetByUserID(string userId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментарі успішно отримано",
                Payload = _mapper.Map<List<CommentDto>>(await _commentRepository.GetByUserID(userId)) ?? null
            };
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
                Payload = _mapper.Map<List<CommentDto>>(await _commentRepository.GetRepliesByCommentID(commentId)) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateCommentDto dto)
        {
            var entity = await _commentRepository.GetByIdAsync(dto.Id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Коментар з id '{dto.Id}' не знайдено"
                };
            }

            entity = _mapper.Map(dto, entity);

            await _commentRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Коментар успішно оновлено"
            };
        }
    }
}
