using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.Auth
{
    public class LoginDto
    {
        public string Login { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
