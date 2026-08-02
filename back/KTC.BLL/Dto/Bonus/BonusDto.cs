using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.Bonus
{
    public class BonusDto
    {
        public string Id { get; set; } = default!;

        public int Amount { get; set; }

        public string Description { get; set; } = default!;

        public DateTime CreatedDate { get; set; }
    }
}
