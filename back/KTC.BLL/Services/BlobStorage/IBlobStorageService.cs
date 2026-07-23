
using KTC.BLL.Services;
using Microsoft.AspNetCore.Http;

namespace KTC.BLL.Interfaces;

public interface IBlobStorageService
{
    Task<ServiceResponse> UploadAsync(IFormFile file);

    Task<ServiceResponse> DeleteAsync(string fileName);
}