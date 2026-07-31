
using KTC.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTC.DAL.Repositories.Media;

public class MediaRepository : IMediaRepository
{
    private readonly AppDbContext _context;

    public MediaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(MediaEntity entity)
    {
        await _context.Media.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(MediaEntity entity)
    {
        _context.Media.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<List<MediaEntity>> GetByProductIdAsync(string productId)
    {
        return await _context.Media
            .Where(x => x.ProductId == productId)
            .OrderBy(x => x.DisplayOrder)
            .ToListAsync();
    }
}