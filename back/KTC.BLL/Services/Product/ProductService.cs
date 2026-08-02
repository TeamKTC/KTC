using AutoMapper;
using KTC.BLL.Dto.Media;
using KTC.BLL.Dto.Product;
using KTC.BLL.Interfaces;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Brand;
using KTC.DAL.Repositories.Category;
using KTC.DAL.Repositories.Media;
using KTC.DAL.Repositories.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic;
using System.Net;

namespace KTC.BLL.Services.Product
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMediaRepository _mediaRepository;
        private readonly IBlobStorageService _blobStorageService;
        private readonly IBrandRepository _brandRepository;
        public ProductService(
            IProductRepository productRepository,
            IMapper mapper,
            ICategoryRepository categoryRepository,
            IMediaRepository mediaRepository,
            IBlobStorageService blobStorageService,
            IBrandRepository brandRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _mediaRepository = mediaRepository;
            _blobStorageService = blobStorageService;
            _brandRepository = brandRepository;
        }
        public async Task<ServiceResponse> CreateAsync(CreateProductDto dto)
        {
            var entity = _mapper.Map<ProductEntity>(dto);

            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            var brand = await _brandRepository.GetByIdAsync(dto.BrandId);

            if (category == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Category з id '{dto.CategoryId}' не знайдено"
                };
            }
            if (brand == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Brand з id '{dto.BrandId}' не знайдено"
                };
            }

            entity.Category = category;
            entity.Brand = brand;

            await _productRepository.CreateAsync(entity);

            int displayOrder = 1;

            foreach (var file in dto.Files)
            {
                var upload = await _blobStorageService.UploadAsync(file);

                if (!upload.IsSuccess)
                    return upload;

                var media = (MediaDto)upload.Payload!;

                await _mediaRepository.CreateAsync(new MediaEntity
                {
                    ProductId = entity.Id,
                    FileName = media.FileName,
                    Url = media.Url,
                    ContentType = media.ContentType,
                    Type = media.Type,
                    Size = media.Size,
                    DisplayOrder = displayOrder++
                });
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Продукт успішно додано"
            };
        }
        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = _productRepository.GetByIdAsync(id).Result;
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Product з id '{id}' не знайдено"
                };
            }
             await _productRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Продукт успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllProducts()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукти успішно отримано",
                Payload = _mapper.Map<List<ProductDto>>(_productRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetProductById(string productId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукт успішно отримано",
                Payload = _mapper.Map<ProductDto>(_productRepository.GetByIdAsync(productId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetProductByName(string productName)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукт успішно отримано",
                Payload = _mapper.Map <List<ProductDto>>(await _productRepository.GetByName(productName)) ?? null
            };
        }

        public async Task<ServiceResponse> GetProductByPriceRange(int min, int max)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукти успішно отримано",
                Payload = _mapper.Map<List<ProductDto>>(await _productRepository.GetByPriceRange(min, max)) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateProductDto dto)
        {
            var entity = _productRepository.GetByIdAsync(dto.Id).Result;

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Product з id '{dto.Id}' не знайдено"
                };
            }
            entity = _mapper.Map(dto, entity);

            await _productRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукт успішно оновлено"
            };
        }

        public async Task<ServiceResponse> WithHitghestMothsPerSold()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукти успішно отримано",
                Payload = _mapper.Map<List<ProductDto>>(await _productRepository.WithHitghestMothsPerSold()) ?? null
            };
        }

        public async Task<ServiceResponse> WithHitghestRate()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Продукти успішно отримано",
                Payload = _mapper.Map<List<ProductDto>>(await _productRepository.WithHitghsRate()) ?? null
            };
        }
    }
}
