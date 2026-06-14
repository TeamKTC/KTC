using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.DAL.Entities
{
    public interface IBaseEntity
    {
        string Id { get; set; }
        DateTime CreatedDate { get; set; }
    }
    public class BaseEntity : IBaseEntity
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
