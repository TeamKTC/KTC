using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTC.BLL.Services.TwoFactor
{
    public interface ITwoFactorService
    {
        Task<string> CreateChallengeAsync(string userId, string email);
        Task<string?> VerifyCodeAsync(string challenge, string code);
    }
}
