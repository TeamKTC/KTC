using AutoMapper;
using KTC.BLL.Dto;
using KTC.BLL.Dto.Bonus;
using KTC.DAL.Repositories.Bonus;
using KTC.DAL.Repositories.User;
using System.Net;

namespace KTC.BLL.Services.Bonus
{
    public class BonusService : IBonusService
    {
        private readonly IBonusRepository _bonusRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public BonusService(
            IBonusRepository bonusRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _bonusRepository = bonusRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetUserBonuses(string userId)
        {
            var bonuses = await _bonusRepository.GetByUserIdAsync(userId);

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = _mapper.Map<List<BonusDto>>(bonuses)
            };
        }

        public async Task<ServiceResponse> GetBonusBalance(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "Користувача не знайдено"
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                StatusCode = HttpStatusCode.OK,
                Payload = new BonusBalanceDto
                {
                    BonusBalance = user.BonusBalance
                }
            };
        }
    }
}