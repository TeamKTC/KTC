using KTC.BLL.Services.Media;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/media")]
public class MediaController : ControllerBase
{
    private readonly IMediaService _mediaService;

    public MediaController(IMediaService mediaService)
    {
        _mediaService = mediaService;
    }

    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetByProductId(string productId)
    {
        var result = await _mediaService.GetByProductIdAsync(productId);

        return StatusCode((int)result.StatusCode, result);
    }
}