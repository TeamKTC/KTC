using AutoMapper;
using KTC.BLL.Dto.OrderItem;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class OrderItemProfile : Profile
    {
        public OrderItemProfile() 
        {
            CreateMap<CreateOrderItemDto, OrderItemEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.ProductId, opt => opt.Ignore())
                .ForMember(dest => dest.OrderId, opt => opt.Ignore());

            CreateMap<UpdateOrderItemDto, OrderItemEntity>()
                .ForMember(dest => dest.ProductId, opt => opt.Ignore())
                .ForMember(dest => dest.OrderId, opt => opt.Ignore());

            CreateMap<OrderItemEntity, OrderItemDto>();
        }
    }
}
