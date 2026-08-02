using AutoMapper;
using KTC.BLL.Dto.Bonus;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles;

public class BonusProfile : Profile
{
    public BonusProfile()
    {
        CreateMap<BonusEntity, BonusDto>();
    }
}