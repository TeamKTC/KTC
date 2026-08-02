using AutoMapper;
using KTC.BLL.Dto.Brand;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class BrandProfile : Profile
    {
        public BrandProfile()
        {
            CreateMap<CreateBrandDto, BrandEntity>();
            CreateMap<UpdateBrandDto, BrandEntity>();
            CreateMap<BrandEntity, BrandDto>();
        }
    }
}
