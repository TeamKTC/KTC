using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Brand
{
    public interface IBrandRepository : IGenericRepository<BrandEntity>
    {
        Task<List<ProductEntity>> GetAllProductsAsync(string brandId);
    }
}
