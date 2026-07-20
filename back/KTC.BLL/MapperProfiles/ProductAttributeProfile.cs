using AutoMapper;
using KTC.BLL.Dto.ProductAttribute;
using KTC.DAL.Entities;
namespace KTC.BLL.MapperProfiles
{
    public class ProductAttributeProfile : Profile
    {       
        public ProductAttributeProfile() 
        {
            CreateMap<CreateProductAttributeDto, ProductAttributeEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()))
                .ForMember(dest => dest.ProductId, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeDefinitionId, opt => opt.Ignore());

            CreateMap<UpdateProductAttributeDto, ProductAttributeEntity>()
                .ForMember(dest => dest.ProductId, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeDefinitionId, opt => opt.Ignore());

            CreateMap<ProductAttributeEntity, ProductAttributeDto>();
        }
    }
}
