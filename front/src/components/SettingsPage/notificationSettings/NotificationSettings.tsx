import { useState } from 'react';
import './NotificationSettings.css';
import { useTranslation } from 'react-i18next';

const NotificationSettings= () => {
  const [settings, setSettings] = useState({
    email: false,
    sms: false,
    bonus: false,
    promotions: false,
    orderStatus: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { t } = useTranslation();

  return (
    <div className="notification-card">
      <h2 className="notification-title">{t('settings.notifications.title')}</h2>

      {/* Email повідомлення */}
      <div className="notification-row">
        <div>
          <div className="notification-label">{t('settings.notifications.emailTitle')}</div>
          <div className="notification-subtext">{t('settings.notifications.emailDesc')}</div>
        </div>
        <label className="toggle-container">
          <input 
            type="checkbox" 
            checked={settings.email} 
            onChange={() => handleToggle('email')}
            className="toggle-input"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* SMS повідомлення */}
      <div className="notification-row">
        <div>
          <div className="notification-label">{t('settings.notifications.smsTitle')}</div>
          <div className="notification-subtext">{t('settings.notifications.smsDesc')}</div>
        </div>
        <label className="toggle-container">
          <input 
            type="checkbox" 
            checked={settings.sms} 
            onChange={() => handleToggle('sms')}
            className="toggle-input"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Бонусні сповіщення */}
      <div className="notification-row">
        <div>
          <div className="notification-label">{t('settings.notifications.bonusTitle')}</div>
          <div className="notification-subtext">{t('settings.notifications.bonusDesc')}</div>
        </div>
        <label className="toggle-container">
          <input 
            type="checkbox" 
            checked={settings.bonus} 
            onChange={() => handleToggle('bonus')}
            className="toggle-input"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Акції та новини */}
      <div className="notification-row">
        <div>
          <div className="notification-label">{t('settings.notifications.promosTitle')}</div>
          <div className="notification-subtext">{t('settings.notifications.promosDesc')}</div>
        </div>
        <label className="toggle-container">
          <input 
            type="checkbox" 
            checked={settings.promotions} 
            onChange={() => handleToggle('promotions')}
            className="toggle-input"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Статус замовлення */}
      <div className="notification-row notification-row-last">
        <div>
          <div className="notification-label">{t('settings.notifications.orderStatusTitle')}</div>
          <div className="notification-subtext">{t('settings.notifications.orderStatusDesc')}</div>
        </div>
        <label className="toggle-container">
          <input 
            type="checkbox" 
            checked={settings.orderStatus} 
            onChange={() => handleToggle('orderStatus')}
            className="toggle-input"
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Кнопка Зберегти зміни */}
      <div className="notification-footer">
        <button 
          type="button" 
          className="btn btn-outline-primary notification-btn fw-medium"
          onClick={() => {
            /* Обробник збереження налаштувань сповіщень */
          }}
        >
          {t('forAll.saveChanges')}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;