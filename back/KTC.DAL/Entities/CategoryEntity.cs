using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public class CategoryEntity : BaseEntity
    {
        public string Name { get; set; } = default!;

        public virtual ICollection<ProductEntity> Products { get; set; } = [];
    }
}
