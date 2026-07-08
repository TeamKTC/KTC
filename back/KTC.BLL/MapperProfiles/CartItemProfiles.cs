using AutoMapper;
using KTC.BLL.Dto.CartItem;
using KTC.DAL.Entities;

namespace KTC.BLL.Mapper
{
    public class CartItemMapper : Profile
    {
        public CartItemMapper()
        {
            CreateMap<CartItemEntity, CartItemDto>();
            CreateMap<CartItemDto, CartItemEntity>();
        }
    }
}