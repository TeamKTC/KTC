using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class FavoriteEntity : BaseEntity
    {
        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;

        public string ProductId { get; set; } = null!;
        public ProductEntity Product { get; set; } = null!;
    }
}
