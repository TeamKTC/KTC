using AutoMapper;
using KTC.BLL.Dto.Comment;
using KTC.DAL.Entities;

namespace KTC.BLL.MapperProfiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile() 
        { 
            CreateMap<CreateCommentDto, CommentEntity>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.ReleaseDate.ToUniversalTime()))
                .ForMember(dest => dest.ProductId, opt => opt.Ignore())
                .ForMember(dest => dest.ParentCommentId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<UpdateCommentDto, CommentEntity>();

            CreateMap<CommentEntity, CommentDto>();
        }
    }
}
