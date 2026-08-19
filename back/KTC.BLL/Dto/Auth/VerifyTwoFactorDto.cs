using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.Auth
{
    public class VerifyTwoFactorDto
    {
        public string Challenge { get; set; } = default!;
        public string Code { get; set; } = default!;
    }
}
