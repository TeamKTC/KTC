using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Media
{
public interface IMediaRepository
{
    Task CreateAsync(MediaEntity entity);

    Task DeleteAsync(MediaEntity entity);

    Task<List<MediaEntity>> GetByProductIdAsync(string productId);
}
}