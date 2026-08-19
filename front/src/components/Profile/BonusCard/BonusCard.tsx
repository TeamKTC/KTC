import "./BonusCard.css";
import {
    useGetBonusBalanceQuery,
    useGetBonusHistoryQuery,
} from "../../../store/services/bonusApi";

const BonusCard = () => {
    const {
        data: balanceData,
        isLoading: balanceLoading,
        error: balanceError,
    } = useGetBonusBalanceQuery();

    const {
        data: historyData,
        isLoading: historyLoading,
        error: historyError,
    } = useGetBonusHistoryQuery();

    const bonusBalance = balanceData?.payload.bonusBalance ?? 0;
    const bonuses = historyData?.payload ?? [];

    if (balanceLoading || historyLoading) {
        return (
            <div className="bonus-card">
                <h2>Бонусна програма</h2>
                <p>Завантаження...</p>
            </div>
        );
    }

    if (balanceError || historyError) {
        return (
            <div className="bonus-card">
                <h2>Бонусна програма</h2>
                <p>Не вдалося завантажити бонуси</p>
            </div>
        );
    }

    return (
        <div className="bonus-card">

            <h2>Бонусна програма</h2>

            <p className="bonus-subtitle">
                Ваш бонусний баланс
            </p>

            <h1 className="bonus-count">
                {bonusBalance} бонусів
            </h1>

            <p className="bonus-text">
                Накопичуйте бонуси за покупки та використовуйте
                їх для оплати 30% вартості замовлення
            </p>

            <h3>Останні операції</h3>

            {bonuses.map((bonus) => (
                <div
                    className="bonus-history-row"
                    key={bonus.id}
                >
                    <span>
                        {bonus.operationType === 0 ? "+" : "-"}{" "}
                        {bonus.amount} бонусів
                    </span>

                    <span>
                        {bonus.description}
                    </span>

                    <span>
                        {new Date(
                            bonus.createdDate
                        ).toLocaleDateString("uk-UA")}
                    </span>
                </div>
            ))}

            <button>
                Всі операції з бонусами
            </button>

        </div>
    );
};

export default BonusCard;