namespace KTC.BLL.Dto.User
{
    public class UpdateProfileDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }
    }
}