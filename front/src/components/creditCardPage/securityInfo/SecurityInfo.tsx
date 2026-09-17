import { ShieldCheck, Clock, Lock } from 'lucide-react';
import './SecurityInfo.css';

const SecurityInfo = () => {
  return (
    <div className="security-card">
      <div className="security-item">
        <div className="icon-wrapper">
          <ShieldCheck className="security-icon" />
        </div>
        <div className="security-content">
          <h4 className="security-title">Безпечно та надійно</h4>
          <p className="security-text">
            Ваші платіжні дані зберігаються у зашифрованому вигляді відповідно
            до міжнародних стандартів безпеки.
          </p>
        </div>
      </div>

      <div className="security-divider" />

      <div className="security-item">
        <div className="icon-wrapper">
          <Clock className="security-icon" />
        </div>
        <div className="security-content">
          <h4 className="security-title">Швидка оплата</h4>
          <p className="security-text">
            Збережені картки дозволяють оформлювати замовлення в кілька
            кліків без повторного введення даних.
          </p>
        </div>
      </div>

      <div className="security-divider" />

      <div className="security-item">
        <div className="icon-wrapper">
          <Lock className="security-icon" />
        </div>
        <div className="security-content">
          <h4 className="security-title">Конфіденційність</h4>
          <p className="security-text">
            Ми не зберігаємо повні реквізити ваших карток і не передаємо їх
            третім особам.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo