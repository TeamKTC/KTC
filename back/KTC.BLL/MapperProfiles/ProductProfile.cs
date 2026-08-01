using AutoMapper;
using KTC.BLL.Dto.Product;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile() 
        {
            CreateMap<CreateProductDto, ProductEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()))
                .ForMember(dest => dest.CategoryId, opt => opt.Ignore())
                .ForMember(dest => dest.BrandId, opt => opt.Ignore());

            CreateMap<UpdateProductDto, ProductEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<ProductEntity, ProductDto>();
        }
    }
}
