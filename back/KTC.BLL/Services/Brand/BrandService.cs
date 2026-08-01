using AutoMapper;
using KTC.BLL.Dto.Brand;
using KTC.BLL.Dto.Product;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Brand;
using System.Net;

namespace KTC.BLL.Services.Brand
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        public BrandService(IBrandRepository brandRepository,
            IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }
        public async Task<ServiceResponse> CreateAsync(CreateBrandDto dto)
        {
            var entity = _mapper.Map<BrandEntity>(dto);

            await _brandRepository.CreateAsync(entity);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Бренд успішно додано"
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _brandRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode= HttpStatusCode.NotFound,
                    Message = "Brand з id '{id}' не знайдено"
                };
            }
            await _brandRepository.DeleteAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Бренд успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllBrands()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Бренди успішно отримано",
                Payload = _mapper.Map<List<BrandDto>>(_brandRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetAllProductsByBeandId(string id)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Бренди успішно отримано",
                Payload = _mapper.Map<List<ProductDto>>(_brandRepository.GetAllProductsAsync(id).Result) ?? null
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Бренди успішно отримано",
                Payload = _mapper.Map<BrandDto>(_brandRepository.GetByIdAsync(id).Result) ?? null
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateBrandDto dto)
        {
            var entity = _brandRepository.GetByIdAsync(dto.Id).Result;
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "Brand з id '{id}' не знайдено"
                };
            }
            entity = _mapper.Map(dto, entity);
            await _brandRepository.UpdateAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Бренд успішно оновлено"
            };
        }
    }
}
