using AutoMapper;
using KTC.BLL.Dto.CreditCard;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class CreditCardProfile : Profile
    {
        public CreditCardProfile()
        {
            CreateMap<CreateCreditCardDto, CreditCardEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()))
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<CreditCardEntity, CreditCardDto>();
        }
    }
}
