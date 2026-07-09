using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Order
{
    public class CreateOrderDto
    {
        public DateTime Date { get; set; }
        public string Status { get; set; } = default!;

        public string UserId { get; set; } = default!;
        public DateTime ReleaseDate { get; internal set; }
    }
}
