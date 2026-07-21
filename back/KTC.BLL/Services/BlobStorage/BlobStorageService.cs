using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using KTC.BLL.Dto.Media;
using KTC.BLL.Interfaces;
using KTC.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace KTC.BLL.Services;

public class BlobStorageService : IBlobStorageService
{
    private readonly BlobContainerClient _container;

    private static readonly string[] AllowedTypes =
    {
        "image/jpeg",
        "image/png",
        "image/webp",
        "video/mp4",
        "video/webm",
        "video/quicktime"
    };

    public BlobStorageService(IConfiguration configuration)
    {
        var service = new BlobServiceClient(
            configuration["AzureBlobStorage:ConnectionString"]);

        _container = service.GetBlobContainerClient(
            configuration["AzureBlobStorage:ContainerName"]);

        _container.CreateIfNotExists();
    }

    public async Task<ServiceResponse> UploadAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "File is empty."
            };
        }

        if (!AllowedTypes.Contains(file.ContentType))
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Unsupported file type."
            };
        }

        var extension = Path.GetExtension(file.FileName);

        var fileName = $"{Guid.NewGuid()}{extension}";

        var blob = _container.GetBlobClient(fileName);

        await using var stream = file.OpenReadStream();

        await blob.UploadAsync(
            stream,
            new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders
                {
                    ContentType = file.ContentType
                }
            });

        return new ServiceResponse
        {
            IsSuccess = true,
            Payload = new MediaDto
            {
                FileName = fileName,
                Url = blob.Uri.ToString(),
                ContentType = file.ContentType,
                Size = file.Length,
                Type = file.ContentType.StartsWith("image")
                    ? MediaType.Image
                    : MediaType.Video
            }
        };
    }

    public async Task<ServiceResponse> DeleteAsync(string fileName)
    {
        var blob = _container.GetBlobClient(fileName);

        await blob.DeleteIfExistsAsync();

        return new ServiceResponse
        {
            IsSuccess = true
        };
    }
}