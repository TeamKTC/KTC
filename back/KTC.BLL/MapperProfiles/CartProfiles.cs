using AutoMapper;
using KTC.BLL.Dto.Cart;
using KTC.DAL.Entities;

namespace KTC.BLL.Mapper
{
    public class CartMapper : Profile
    {
        public CartMapper()
        {
            CreateMap<CartEntity, CartDto>();
            CreateMap<CartDto, CartEntity>();
        }
    }
}