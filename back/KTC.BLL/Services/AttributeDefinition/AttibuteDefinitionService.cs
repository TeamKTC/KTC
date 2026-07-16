using AutoMapper;
using KTC.BLL.Dto.AttributeDefinition;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.AttributeDefinition;

namespace KTC.BLL.Services.AttributeDefinition
{
    public class AttibuteDefinitionService : IAttibuteDefinitionService
    {
        private readonly IAttributeDefinitionRepository _attributeDefinitionRepository;
        private readonly IMapper _mapper;
        public AttibuteDefinitionService(IAttributeDefinitionRepository attributeDefinitionRepository, IMapper mapper)
        {
            _attributeDefinitionRepository = attributeDefinitionRepository;
            _mapper = mapper;
        }
        public async Task<ServiceResponse> CreateAsync(CreateAttributeDefinitionDto dto)
        {
            var entity = _mapper.Map<AttributeDefinitionEntity>(dto);
            await _attributeDefinitionRepository.CreateAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.Created,
                Message = "AttributeDefinition успішно додано"
            };
        }
        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _attributeDefinitionRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"AttributeDefinition з id '{id}' не знайдено"
                };
            }
            await _attributeDefinitionRepository.DeleteAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = "AttributeDefinition успішно видалено"
            };
        }
        public async Task<ServiceResponse> GetAllAtributeDefinitions()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload =  _mapper.Map<List<AttributeDefinitionDto>>(_attributeDefinitionRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetAttributeDefinitionById(string attributeDefinitionId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<AttributeDefinitionDto>(await _attributeDefinitionRepository.GetByIdAsync(attributeDefinitionId)) ?? null
            };
        }

        public async Task<ServiceResponse> GetByName(string name)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<AttributeDefinitionDto>(await _attributeDefinitionRepository.GetByName(name)) ?? null
            };
        }

        public async Task<ServiceResponse> GetByProductId(string productId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<AttributeDefinitionDto>(_attributeDefinitionRepository.GetByProductId(productId)) ?? null
            };
        }
        public async Task<ServiceResponse> GetByType(string type)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = _mapper.Map<List<AttributeDefinitionDto>>(_attributeDefinitionRepository.GetByType(type).Result) ?? null
            };
        }

        public async Task<ServiceResponse> IsAttributeDefinitionIntegers(string attributeDefinitionId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Payload = await _attributeDefinitionRepository.IsAttributeDefinitionIntegers(attributeDefinitionId)
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateAttributeDefinitionDto dto)
        {
            var entity = await _attributeDefinitionRepository.GetByIdAsync(dto.Id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = $"AttributeDefinition з id '{dto.Id}' не знайдено"
                };
            }
            entity = _mapper.Map(dto, entity);

            await _attributeDefinitionRepository.UpdateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = "AttributeDefinition успішно оновлено"
            };
        }
    }
}
