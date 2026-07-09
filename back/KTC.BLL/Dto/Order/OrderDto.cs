using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Order
{
    public class OrderDto
    {
        public string Id { get; set; } = default!;
        public DateTime Date { get; set; }
        public string Status { get; set; } = default!;

        public string UserId { get; set; } = default!;
        public UserEntity User { get; set; } = default!;

        public virtual ICollection<OrderItemEntity> Items { get; set; } = [];
        public DateTime ReleaseDate { get; internal set; }
    }
}
