
import { useEffect, useState } from 'react';
import './SecuritySettings.css';
import { useTranslation } from 'react-i18next';


export const getClientOS = (): string => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) {
    // Перевірка на iPad, який може маскуватися під Mac
    return navigator.maxTouchPoints > 0 ? 'iPadOS' : 'macOS';
  }
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  if (userAgent.includes('Linux')) return 'Linux';

  return 'Невідомий пристрій';
};


const SecuritySettings = () => {

  const [deviceOS, setDeviceOS] = useState<string>('Завантаження...');

  useEffect(() => {
    setDeviceOS(getClientOS());
  }, []);
 const {t} = useTranslation();

  return (
    <div className="security-card">
      <h2 className="security-title">{t('forAll.security')}</h2>

      {/* Пароль */}
      <div className="security-row">
        <div>
          <div className="security-label">{t('forAll.password')}</div>
          <div className="security-subtext">{t('settings.security.lastChange')} 12.04.2025</div>
        </div>
        <button 
          type="button" 
          className="security-link-btn"
          onClick={() => {
            /* Обробник зміни пароля */
          }}
        >
          {t('settings.security.changePassword')}
        </button>
      </div>

      {/* Заголовок активних пристроїв */}
      <div className="security-section-header">
        <div className="security-label">{t('settings.security.activeDevicesTitle')}</div>
        <div className="security-subtext">
          {t('settings.security.activeDevicesDesc')}
        </div>
      </div>

      {/* Поточний сеанс (Windows) */}
      <div className="security-row">
        <div>
          <div className="security-device-name">{deviceOS}</div>
          <div className="security-subtext">Рівне, Україна</div>
        </div>
        <span className="security-badge-current">{t('settings.security.currentSession')}</span>
      </div>

      {/* Додатковий пристрій (iPhone) */}
      <div className="security-row">
        <div>
          <div className="security-device-name">Iphone 15 Pro Max</div>
          <div className="security-subtext">Рівне, Україна</div>
        </div>
        <span className="security-date text-nowrap">18.07.2026, 09:20</span>
      </div>

      {/* Кнопка виходу з усіх пристроїв */}
      <div className="security-footer">
        <button 
          type="button" 
          className="security-logout-btn"
          onClick={() => {
            /* Обробник виходу з усіх пристроїв */
          }}
        >
          {t('settings.security.logoutAll')}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;