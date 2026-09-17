
namespace KTC.BLL.Dto.CreditCard
{
    public class CreditCardDto
    {
        public string Id { get; set; }
        public string PaymentSystem { get; set; }
        public string CardNumber { get; set; }
        public string NameAndSurname { get; set; }
        public string CVV { get; set; }
        public string Termin { get; set; }
        public string Name { get; set; } = default!;
        public bool IsMain { get; set; }
        public string UserId { get; set; } = default!;
    }
}
