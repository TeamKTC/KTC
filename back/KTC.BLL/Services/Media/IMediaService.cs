    using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.Media
{
    public interface IMediaService
    {
        Task<ServiceResponse> GetByProductIdAsync(string productId);
    }
}
