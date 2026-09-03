import "./BonusHistory.css";
import { useGetMyOrdersQuery } from "../../../store/services/orderApi";
import { useTranslation } from "react-i18next";

const BonusHistory = () => {
    const {
        data,
        isLoading,
        error,
    } = useGetMyOrdersQuery();

    const orders = data?.payload ?? [];
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className="bonus-history">
                <div className="history-header">
                    <h2>Мої замовлення</h2>
                </div>

                <p>Завантаження...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bonus-history">
                <div className="history-header">
                    <h2>Мої замовлення</h2>
                </div>

                <p>Не вдалося завантажити замовлення</p>
            </div>
        );
    }

    return (
        <div className="bonus-history">
            <div className="history-header">
                <h2>{t("profile.bonusHistory.title")}</h2>

                <button>{t("profile.bonusHistory.viewAll")}</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>{t("profile.bonusHistory.orderNumber")}</th>
                        <th>{t("profile.bonusHistory.date")}</th>
                        <th>{t("profile.bonusHistory.status")}</th>
                        <th>{t("profile.bonusHistory.amount")}</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>№{order.orderNumber}</td>

                            <td>
                                {new Date(
                                    order.createdDate
                                ).toLocaleDateString("uk-UA")}
                            </td>

                            <td>{order.status}</td>

                            <td>
                                {order.totalPrice?.toLocaleString("uk-UA")} грн
                            </td>

                            <td className="arrow">›</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BonusHistory;    