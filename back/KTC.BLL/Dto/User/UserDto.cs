using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Dto.User
{
    public class UserDto
    {
        public string Id { get; set; } = default!;

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? BonusBalance { get; set; }
        public DateTime CreatedDate { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public DateOnly BirthDate { get; set; }

    }
}
