namespace KTC.BLL.Dto.Order
{
    public class UpdateOrderDto
    {
        public string Id { get; set; } = default!;
        public DateTime Date { get; set; }
        public string Status { get; set; } = default!;
    }
}
