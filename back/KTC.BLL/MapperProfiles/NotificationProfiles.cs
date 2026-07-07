using AutoMapper;
using KTC.BLL.Dto.Notification;
using KTC.DAL.Entities;

namespace KTC.BLL.Mapper
{
    public class NotificationMapper : Profile
    {
        public NotificationMapper()
        {
            CreateMap<NotificationEntity, NotificationDto>();
            CreateMap<NotificationDto, NotificationEntity>();
        }
    }
}