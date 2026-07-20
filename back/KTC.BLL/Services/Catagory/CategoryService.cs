using AutoMapper;
using KTC.BLL.Dto.Category;
using KTC.BLL.Dto.Product;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Category;
using Microsoft.VisualBasic;
using System.Runtime.CompilerServices;

namespace KTC.BLL.Services.Catagory
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(IMapper mapper, ICategoryRepository categoryRepository)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }
        public async Task<ServiceResponse> CreateAsync(CreateCategoryDto dto)
        {
            var entity = _mapper.Map<CategoryEntity>(dto);

            await _categoryRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорію успішно додано",
                StatusCode = System.Net.HttpStatusCode.Created
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _categoryRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Категорія не знайдена",
                    StatusCode = System.Net.HttpStatusCode.NotFound
                };
            }

            await _categoryRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорію успішно видалено",
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetAllCategories()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорії успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<CategoryDto>>(_categoryRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetCategoryById(string categoryId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорію успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<CategoryDto>(_categoryRepository.GetByIdAsync(categoryId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetCategoryByName(string categoryName)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорію успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<CategoryDto>(_categoryRepository.GetByName(categoryName).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetProductsByCategoryName(string name)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Продукти успішно отримано",
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductDto>>(_categoryRepository.GetProductsByCategoryName(name).Result) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateCategoryDto dto)
        {
            var entity = await _categoryRepository.GetByIdAsync(dto.Id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Категорія не знайдена",
                    StatusCode = System.Net.HttpStatusCode.NotFound
                };
            }
            entity = _mapper.Map(dto, entity);
            
            await _categoryRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Категорію успішно оновлено",
                StatusCode = System.Net.HttpStatusCode.OK
            };
        }
    }
}
