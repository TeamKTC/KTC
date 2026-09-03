import { useTranslation } from 'react-i18next';
import './PrivacySettings.css';

const PrivacySettings = () => {
   const { t } = useTranslation();

  return (
    <div className="privacy-card">
      <h2 className="privacy-title">
        {t('settings.privacy.title')}
      </h2>

      {/* Збережені картки */}
      <div className="privacy-row">
        <div>
          <div className="privacy-label">{t('settings.privacy.savedCardsTitle')}</div>
          <div className="privacy-description">{t('settings.privacy.savedCardsDesc')}</div>
        </div>
        <button 
          type="button" 
          className="privacy-btn privacy-btn-blue"
          onClick={() => {
            /* Обробник керування картками */
          }}
        >
          {t('settings.privacy.manageCards')}
        </button>
      </div>

      {/* Персоналізація */}
      <div className="privacy-row">
        <div>
          <div className="privacy-label">{t('settings.privacy.personalizationTitle')}</div>
          <div className="privacy-description">{t('settings.privacy.personalizationDesc')}</div>
        </div>

        {/* Компактний Toggle Switch */}
        <label className="toggle-container">
          <input 
            type="checkbox" 
            defaultChecked 
            className="toggle-input"
            onChange={() => {
              /* Обробник перемикання персоналізації */
            }}
          />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* Керування даними */}
      <div className="privacy-row privacy-row-last">
        <div>
          <div className="privacy-label">{t('settings.privacy.dataManagementTitle')}</div>
          <div className="privacy-description">{t('settings.privacy.dataManagementDesc')}</div>
        </div>
        <div className="privacy-actions">
          <button 
            type="button" 
            className="privacy-btn privacy-btn-blue"
            onClick={() => {
              /* Обробник завантаження даних */
            }}
          >
            {t('settings.privacy.dataManagementTitle')}
          </button>
          <button 
            type="button" 
            className="privacy-btn privacy-btn-red"
            onClick={() => {
              /* Обробник видалення акаунту */
            }}
          >
            {t('settings.privacy.deleteAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;