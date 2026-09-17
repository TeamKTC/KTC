import "./BonusHistoryPage.css";
import { useNavigate } from "react-router-dom";
import { useGetBonusHistoryQuery } from "../../../src/store/services/bonusApi";

const BonusHistoryPage = () => {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        error,
    } = useGetBonusHistoryQuery();

    const bonuses = data?.payload ?? [];

    if (isLoading) {
        return (
            <div className="bonus-history-page">
                <div className="bonus-history-header">
                    <button
                        className="bonus-history-close"
                        type="button"
                        onClick={() => navigate("/profile")}
                        aria-label="Закрити"
                    >
                        ×
                    </button>

                    <h1>Історія бонусів</h1>
                </div>

                <p>Завантаження...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bonus-history-page">
                <div className="bonus-history-header">
                    <button
                        className="bonus-history-close"
                        type="button"
                        onClick={() => navigate("/profile")}
                        aria-label="Закрити"
                    >
                        ×
                    </button>

                    <h1>Історія бонусів</h1>
                </div>

                <p>Не вдалося завантажити бонуси</p>
            </div>
        );
    }

    return (
        <div className="bonus-history-page">
            <div className="bonus-history-header">
                <button
                    className="bonus-history-close"
                    type="button"
                    onClick={() => navigate("/profile")}
                    aria-label="Закрити"
                >
                    ×
                </button>

                <h1>Історія бонусів</h1>
            </div>

            {bonuses.length === 0 ? (
                <p>Операцій з бонусами ще немає</p>
            ) : (
                <div className="bonus-history-list">
                    {bonuses.map((bonus) => (
                        <div
                            className="bonus-history-item"
                            key={bonus.id}
                        >
                            <span
                                className={
                                    bonus.operationType === 0
                                        ? "bonus-plus"
                                        : "bonus-minus"
                                }
                            >
                                {bonus.operationType === 0
                                    ? "+"
                                    : "-"}{" "}
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
                </div>
            )}
        </div>
    );
};

export default BonusHistoryPage;
