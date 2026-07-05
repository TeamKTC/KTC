using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Category
{
    public interface ICategoryRepository : IGenericRepository<CategoryEntity>
    {
        Task<CategoryEntity> GetByName(string name);
        Task<List<ProductEntity>> GetProductsByCategoryName(string name);
    }
}
