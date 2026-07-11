using KTC.BLL.Settings;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace KTC.BLL.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> options)
        {
            _settings = options.Value;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            using var smtp = new SmtpClient(_settings.Host, _settings.Port)
            {
                EnableSsl = _settings.EnableSsl,
                Credentials = new NetworkCredential(
                    _settings.Email,
                    _settings.Password)
            };

            using var message = new MailMessage
            {
                From = new MailAddress(_settings.Email),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            message.To.Add(to);

            await smtp.SendMailAsync(message);
        }
    }
}