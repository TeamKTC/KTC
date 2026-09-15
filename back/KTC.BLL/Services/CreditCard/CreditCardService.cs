using AutoMapper;
using KTC.BLL.Dto.CreditCard;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.CreditCard;
using KTC.DAL.Repositories.User;
using System.Net;

namespace KTC.BLL.Services.CreditCard
{
    public class CreditCardService : ICreditCardService
    {
        private readonly ICreditCardRepository _creditCardRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public CreditCardService(ICreditCardRepository creditCardRepository, IMapper mapper, IUserRepository userRepository)
        {
            _creditCardRepository = creditCardRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<ServiceResponse> CreateAsync(CreateCreditCardDto dto)
        {
            var entity = _mapper.Map<CreditCardEntity>(dto);
            var user = await _userRepository.GetByIdAsync(dto.UserId);

            entity.User = user;
            await _creditCardRepository.CreateAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.Created,
                Message = "Кредитку успішно створено"
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var entity = await _creditCardRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = $"Кредитки з id '{id}' не знайдено"
                };

            }
            await _creditCardRepository.DeleteAsync(entity);
            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Message = "Кредитку успішно видалено"
            };
        }

        public async Task<ServiceResponse> GetAllCreidtCards()
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<CreditCardDto>>(_creditCardRepository.GetAll()) ?? null
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<CreditCardDto>(_creditCardRepository.GetByIdAsync(id)) ?? null
            };
        }

        public async Task<ServiceResponse> GetByUserID(string userId)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<CreditCardDto>>( await _creditCardRepository.GetByUserID(userId)) ?? null
            };
        }
    }
}
