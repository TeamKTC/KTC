namespace KTC.BLL.Dto.Notification
{
    public class NotificationDto
    {
        public string Id { get; set; } = default!;

        public string UserId { get; set; } = default!;

        public string Title { get; set; } = default!;

        public string Message { get; set; } = default!;

        public string Type { get; set; } = default!;

        public bool IsRead { get; set; }

        public DateTime CreatedDate { get; set; }
    }

}