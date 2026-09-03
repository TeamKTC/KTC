import { useTheme } from '../../../context/ThemeContext';
import i18n from '../../../translating/i18n';
import './PersonalSettings.css';
import { useTranslation } from 'react-i18next';

const PersonalSettings = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();


  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-lang', newLang); // Зберігаємо вибір користувача
  };

  return (
    <div className="personal-card">
      <h2 className="personal-title">
        {t('settings.personalSettings.title')}
      </h2>

      {/* Валюта */}
      <div className="personal-field">
        <label className="personal-label">
          {t('settings.personalSettings.currency')}
        </label>
        <select 
          className="form-select personal-select shadow-none" 
          defaultValue="UAH"
          onChange={() => {
            /* Обробник зміни валюти */
          }}
        >
          <option value="UAH">{t('settings.personalSettings.currencyUah')}</option>
          <option value="USD">{t('settings.personalSettings.currencyUsd')}</option>
        </select>
      </div>

      {/* Мова */}
      <div className="personal-field">
        <label className="personal-label">
          {t('settings.personalSettings.language')}
        </label>
        <select 
          className="form-select personal-select shadow-none" 
          value={i18n.language}
          onChange={handleLanguageChange}
        >
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Тема інтерфейсу */}
      <div className="personal-field-last">
        <label className="personal-label">
          {t('settings.personalSettings.theme')}
        </label>
        <select 
          className="form-select personal-select shadow-none" 
          
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">{t('settings.personalSettings.themeLight')}</option>
          <option value="dark">{t('settings.personalSettings.themeDark')}</option>
        </select>
      </div>

      {/* Кнопки дій */}
      <div className="personal-actions">
        <button 
          type="button" 
          className="btn btn-outline-primary personal-btn fw-medium"
          onClick={() => {
            /* Обробник збереження змін */
          }}
        >
          {t('forAll.saveChanges')}
        </button>
        <button 
          type="button" 
          className="btn btn-outline-secondary personal-btn personal-btn-secondary fw-medium"
          onClick={() => {
            /* Обробник скасування */
          }}
        >
          {t('forAll.cancel')}
        </button>
      </div>
    </div>
  );
};

export default PersonalSettings;