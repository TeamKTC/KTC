using AutoMapper;
using KTC.BLL.Dto.AttributeDefinition;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class AttributeDefinitionProfile : Profile
    {
        public AttributeDefinitionProfile() 
        {
            CreateMap<CreateAttributeDefinitionDto, AttributeDefinitionEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()));
            CreateMap<UpdateAttributeDefinitionDto, AttributeDefinitionEntity>();
            CreateMap<AttributeDefinitionEntity, AttributeDefinitionDto>();
        }
    }
}
