import "./OrderSummary.css";
import { Shield } from "lucide-react";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <h2>Підсумок замовлення</h2>

      <div className="summary-row">
        <span>Сума товарів (4)</span>
        <strong>30 999 грн</strong>
      </div>

      <div className="summary-row">
        <span>Доставка</span>
        <strong>Безкоштовно</strong>
      </div>

      <div className="summary-row">
        <span>Знижка</span>
        <strong>-3 800 грн</strong>
      </div>

      <div className="summary-row">
        <span>Бонуси використано</span>
        <strong>3 399 грн</strong>
      </div>

      <div className="summary-divider" />

      <div className="summary-total">
        <span>До сплати</span>
        <strong>30 999 грн</strong>
      </div>

      <div className="vat">
        Усі ціни вказані з ПДВ
      </div>

      <div className="promo-title">
        У вас є промокод
      </div>

      <div className="promo">
        <input
          type="text"
          placeholder="Введіть промокод"
        />

        <button>
          Застосувати
        </button>
      </div>

      <div className="bonus-block">
        <div>
          <strong>Доступно 390 бонусів</strong>
          <span>Списати бонуси</span>
        </div>

        <label className="switch">
          <input type="checkbox" />
          <span />
        </label>
      </div>

      <button className="checkout-button">
        Оформити замовлення
      </button>

      <button className="continue-button">
        Продовжити покупку
      </button>

      <div className="safe-payment">
        <Shield
          className="safe-icon"
          size={32}
          strokeWidth={1.5}
        />

        <div>
          <strong>Безпечна оплата</strong>

          <p>
            Ваші дані під захистом. Оплата
            онлайн або при отриманні
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;