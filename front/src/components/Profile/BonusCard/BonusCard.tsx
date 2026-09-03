import "./BonusCard.css";
import {
    useGetBonusBalanceQuery,
    useGetBonusHistoryQuery,
} from "../../../store/services/bonusApi";
import { useTranslation } from "react-i18next";

const BonusCard = () => {
    const {t} = useTranslation();
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

            <h2>{t("profile.bonusCard.title")}</h2>

            <p className="bonus-subtitle">
                {t("profile.bonusCard.subtitle")}
            </p>

            <h1 className="bonus-count">
                {bonusBalance} {t("profile.bonusCard.bonusCount")}
            </h1>

            <p className="bonus-text">
                {t("profile.bonusCard.infoText", { percent: 30 })}
            </p>

            <h3>{t("profile.bonusCard.recentTransactions")}</h3>

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
                {t("profile.bonusCard.allOperations")}
            </button>

        </div>
    );
};

export default BonusCard;