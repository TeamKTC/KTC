using AutoMapper;
using KTC.BLL.Dto.Category;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile() 
        {
            CreateMap<CategoryEntity, CategoryDto>();
            CreateMap<CreateCategoryDto, CategoryEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()));
            CreateMap<UpdateCategoryDto, CategoryEntity>()
        }
    }
}
