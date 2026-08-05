using AutoMapper;
using KTC.BLL.Dto.Favorite;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class FavoriteProfile : Profile
    {
        public FavoriteProfile()
        {
            CreateMap<FavoriteEntity, FavoriteDto>();
            CreateMap<FavoriteDto, FavoriteEntity>();
        }
    }
}