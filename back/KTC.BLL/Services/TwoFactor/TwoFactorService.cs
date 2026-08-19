using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography;
using System.Text;

namespace KTC.BLL.Services.TwoFactor
{
    public class TwoFactorService
    {
        private readonly IMemoryCache _cache;

        public TwoFactorService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public string GenerateCode()
        {
            return RandomNumberGenerator
                .GetInt32(100000, 1000000)
                .ToString();
        }

        public string CreateChallenge(
            string userId,
            string code)
        {
            var challenge = Guid.NewGuid().ToString("N");

            var data = new TwoFactorData
            {
                UserId = userId,
                CodeHash = HashCode(code),
                Attempts = 0
            };

            _cache.Set(
                $"2fa:{challenge}",
                data,
                TimeSpan.FromMinutes(5));

            return challenge;
        }

        public TwoFactorData? GetChallenge(string challenge)
        {
            return _cache.Get<TwoFactorData>($"2fa:{challenge}");
        }

        public bool VerifyCode(
            string challenge,
            string code)
        {
            var data = GetChallenge(challenge);

            if (data == null)
                return false;

            data.Attempts++;

            if (data.Attempts > 5)
            {
                _cache.Remove($"2fa:{challenge}");
                return false;
            }

            if (data.CodeHash != HashCode(code))
            {
                return false;
            }

            _cache.Remove($"2fa:{challenge}");

            return true;
        }

        private string HashCode(string code)
        {
            var bytes = SHA256.HashData(
                Encoding.UTF8.GetBytes(code));

            return Convert.ToHexString(bytes);
        }
    }

    public class TwoFactorData
    {
        public string UserId { get; set; } = default!;

        public string CodeHash { get; set; } = default!;

        public int Attempts { get; set; }
    }
}