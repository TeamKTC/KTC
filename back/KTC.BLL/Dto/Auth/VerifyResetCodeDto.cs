using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.Auth
{
    public class VerifyResetCodeDto
    {
        public string Challenge { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }


}
