using AutoMapper;
using KTC.BLL.Dto.Order;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile() 
        { 
            CreateMap<CreateOrderDto, OrderEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToUniversalTime()))
                .ForMember(dest => dest.UserId, opt => opt.Ignore());


            CreateMap<UpdateOrderDto, OrderEntity>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToUniversalTime()));

            CreateMap<OrderEntity, OrderDto>();
        }
    }
}
