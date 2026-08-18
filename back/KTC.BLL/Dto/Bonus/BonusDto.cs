using KTC.DAL.Entities;

namespace KTC.BLL.Dto.Bonus
{
    public class BonusDto
    {
        public string Id { get; set; } = default!;

        public int Amount { get; set; }

        public BonusOperationType OperationType { get; set; }

        public string Description { get; set; } = default!;

        public string? OrderNumber { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}