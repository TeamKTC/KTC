using AutoMapper;
using KTC.BLL.Dto.Notification;
using KTC.DAL.Entities;
using KTC.DAL.Repositories.Notification;
using System.Net;

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

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var notification = await _repository.GetByIdAsync(id);

            if (notification == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Notification not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<NotificationDto>(notification),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> GetUserNotificationsAsync(string userId)
        {
            var notifications = await _repository.GetUserNotificationsAsync(userId);

            return new ServiceResponse
            {
                IsSuccess = true,
                Payload = _mapper.Map<List<NotificationDto>>(notifications),
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> CreateAsync(NotificationDto dto)
        {
            var notification = _mapper.Map<NotificationEntity>(dto);

            await _repository.CreateAsync(notification);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Notification created",
                StatusCode = HttpStatusCode.Created
            };
        }

        public async Task<ServiceResponse> UpdateAsync(NotificationDto dto)
        {
            var notification = _mapper.Map<NotificationEntity>(dto);

            await _repository.UpdateAsync(notification);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Notification updated",
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var notification = await _repository.GetByIdAsync(id);

            if (notification == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Notification not found",
                    StatusCode = HttpStatusCode.NotFound
                };
            }

            await _repository.DeleteAsync(notification);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Notification deleted",
                StatusCode = HttpStatusCode.OK
            };
        }

        public async Task<ServiceResponse> MarkAsReadAsync(string id)
        {
            await _repository.MarkAsReadAsync(id);

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Notification marked as read",
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}