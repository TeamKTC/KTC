using AutoMapper;
using KTC.BLL.Dto.Media;
using KTC.BLL.Interfaces;
using KTC.BLL.Services.Media;
using KTC.DAL.Repositories.Media;
using System.Net;

namespace KTC.BLL.Services;

public class MediaService : IMediaService
{
    private readonly IMediaRepository _mediaRepository;
    private readonly IMapper _mapper;

    public MediaService(
        IMediaRepository mediaRepository,
        IMapper mapper)
    {
        _mediaRepository = mediaRepository;
        _mapper = mapper;
    }

    public async Task<ServiceResponse> GetByProductIdAsync(string productId)
    {
        var media = await _mediaRepository.GetByProductIdAsync(productId);

        if (media == null || !media.Any())
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                StatusCode = HttpStatusCode.NotFound,
                Message = $"Media for product with id '{productId}' not found"
            };
        }

        return new ServiceResponse
        {
            IsSuccess = true,
            StatusCode = HttpStatusCode.OK,
            Payload = _mapper.Map<List<MediaDto>>(media)
        };
    }
}