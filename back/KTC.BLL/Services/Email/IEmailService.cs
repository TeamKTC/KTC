using System.Threading.Tasks;

namespace KTC.BLL.Services.Email
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
    }
}