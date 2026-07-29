import "./BonusCard.css";

const BonusCard = () => {
    return (
        <div className="bonus-card">

            <h2>Бонусна програма</h2>

            <p className="bonus-subtitle">
                Ваш бонусний баланс
            </p>

            <h1 className="bonus-count">
                390 бонусів
            </h1>

            <p className="bonus-text">
                Накопичуйте бонуси за покупки та використовуйте
                їх для оплати 30% вартості замовлення
            </p>

            <h3>Останні нарахування</h3>

            <div className="bonus-history-row">
                <span>+ 150 бонусів</span>
                <span>Покупка №104353</span>
                <span>15.05.2026</span>
            </div>

            <div className="bonus-history-row">
                <span>+ 80 бонусів</span>
                <span>Покупка №123153</span>
                <span>01.03.2026</span>
            </div>

            <div className="bonus-history-row">
                <span>+200 бонусів</span>
                <span>Покупка №135896</span>
                <span>25.12.2025</span>
            </div>

            <button>
                Всі операції з бонусами
            </button>

        </div>
    );
};

export default BonusCard;