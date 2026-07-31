using KTC.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.Media
{
    public class MediaDto
    {
        public string FileName { get; set; } = default!;

        public string Url { get; set; } = default!;

        public MediaType Type { get; set; }

        public string ContentType { get; set; } = default!;
        public int DisplayOrder { get; set; }
        public long Size { get; set; }
    }
}
