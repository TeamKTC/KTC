    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace KTC.DAL.Entities
    {

        public enum BonusOperationType
        {
            Earned = 0,
            Spent = 1
        }
        public class BonusEntity : BaseEntity
        {
            public int Amount { get; set; }

            public BonusOperationType OperationType { get; set; }

            public string Description { get; set; } = string.Empty;

            public string UserId { get; set; } = default!;
            public UserEntity User { get; set; } = default!;

            public string? OrderId { get; set; }
            public OrderEntity? Order { get; set; }
        }
    }
