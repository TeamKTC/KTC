using AutoMapper;
using KTC.BLL.Dto.Product;
using KTC.BLL.Dto.ProductAttribute;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.AttributeDefinition;
using KTC.DAL.Repositories.Product;
using KTC.DAL.Repositories.ProductAttribute;

namespace KTC.BLL.Services.ProductAttribute
{
    public class ProductAttributeService : IProductAttributeService
    {
        private readonly IProductAttributeRepository _productAttributeRepository;
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;

        public ProductAttributeService(IProductAttributeRepository productAttributeRepository,
            IMapper mapper, IProductRepository productRepository,
            IAttributeDefinitionRepository attributeDefinitionRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _productAttributeRepository = productAttributeRepository;
            _attributeDefinitionRepository = attributeDefinitionRepository;
        }

        public async Task<ServiceResponse> CreateAsync(CreateProductAttributeDto dto)
        {
            var entity = _mapper.Map<ProductAttributeEntity>(dto);
            var product = _productRepository.GetByIdAsync(dto.ProductId).Result;
            var attributeDefinition = _attributeDefinitionRepository.GetByIdAsync(dto.AttributeDefinitionId).Result;

            if (product == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"Product з id '{dto.ProductId}' не знайдено"
                };
            }

            if (attributeDefinition == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"AttributeDefinition з id '{dto.AttributeDefinitionId}' не знайдено"
                };
            }

            entity.Product = product;
            entity.AttributeDefinition = attributeDefinition;

            await _productAttributeRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.Created,
                Message = "ProductAttribute успішно додано"
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _productAttributeRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"ProductAttribute з id '{id}' не знайдено"
                };
            }

            await _productAttributeRepository.DeleteAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = "ProductAttribute успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllAtributes()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductAttributeDto>>(_productAttributeRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetByAttributeDefinitionId(string attributeDefinitionId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductAttributeDto>>(_productAttributeRepository.GetByAttributeDefinitionId(attributeDefinitionId).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetByProductId(string productId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductAttributeDto>>(_productAttributeRepository.GetByProductId(productId).Result) ?? null
            }; 
        }

        public async  Task<ServiceResponse> GetByRangeOfValue(string attributeDefinitionId, int min, int max)
        {
            var definition = _attributeDefinitionRepository.IsAttributeDefinitionIntegers(attributeDefinitionId).Result;
            if (definition)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Payload = _mapper.Map<List<ProductDto>>(_productAttributeRepository.GetByRangeOfValue(attributeDefinitionId, min, max).Result) ?? null
                };
            }

            return new ServiceResponse
            {
                IsSuccess = false,
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Message = $"AttributeDefinition з id '{attributeDefinitionId}' не є числовим"
            };
        }

        public async Task<ServiceResponse> GetByStringValue(string attributeDefinitionId, string value)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<ProductDto>>(await _productAttributeRepository.GetByStringValue(attributeDefinitionId, value)) ?? null
            };
        }

        public async Task<ServiceResponse> GetProductAttributeById(string productAttributeId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<ProductAttributeDto>(await _productAttributeRepository.GetByIdAsync(productAttributeId))?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateProductAttributeDto dto)
        {
            var entity = await _productAttributeRepository.GetByIdAsync(dto.Id);

            if (entity == null) 
            { 
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"ProductAttribute з id '{dto.Id}' не знайдено"
                };
            }

            entity = _mapper.Map(dto, entity);

            await _productAttributeRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = "ProductAttribute успішно оновлено"
            };
        }


    }
}
