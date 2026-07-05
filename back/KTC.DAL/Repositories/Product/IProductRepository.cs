using KTC.DAL.Entities;

namespace KTC.DAL.Repositories.Product
{
    public interface IProductRepository : IGenericRepository<ProductEntity>
    {
        Task<List<ProductEntity>> GetByCategory(string CatagoryId);
        Task<List<ProductEntity>> GetByPriceRange(int min, int max);
        Task<List<ProductEntity>> GetByName(string name);
        Task<List<CommentEntity>> GetAllComments();
    }
}
