using AutoMapper;
using KTC.BLL.Dto.Media;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class MediaProfiles : Profile
    {
        public MediaProfiles()
        {
            CreateMap<MediaEntity, MediaDto>();
            CreateMap<MediaDto, MediaEntity>();
        }
    }
}