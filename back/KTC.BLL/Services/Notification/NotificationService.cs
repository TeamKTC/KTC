using AutoMapper;
using KTC.BLL.Dto.Notification;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Notification;

namespace KTC.BLL.Services.Notification
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;
        private readonly IMapper _mapper;

        public NotificationService(
            INotificationRepository repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<NotificationDto?> GetByIdAsync(string id)
        {
            var notification = await _repository.GetByIdAsync(id);

            return _mapper.Map<NotificationDto?>(notification);
        }

        public async Task<List<NotificationDto>> GetUserNotificationsAsync(string userId)
        {
            var notifications = await _repository.GetUserNotificationsAsync(userId);

            return _mapper.Map<List<NotificationDto>>(notifications);
        }

        public async Task CreateAsync(NotificationDto dto)
        {
            var notification = _mapper.Map<NotificationEntity>(dto);

            await _repository.CreateAsync(notification);
        }

        public async Task UpdateAsync(NotificationDto dto)
        {
            var notification = _mapper.Map<NotificationEntity>(dto);

            await _repository.UpdateAsync(notification);
        }

        public async Task DeleteAsync(string id)
        {
            var notification = await _repository.GetByIdAsync(id);

            if (notification == null)
                return;

            await _repository.DeleteAsync(notification);
        }

        public async Task MarkAsReadAsync(string id)
        {
            await _repository.MarkAsReadAsync(id);
        }
    }
}