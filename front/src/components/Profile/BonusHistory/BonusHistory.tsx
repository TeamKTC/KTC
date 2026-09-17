import "./BonusHistory.css";
import { useNavigate } from "react-router-dom";
import {
    useGetMyLast7OrdersQuery,
} from "../../../store/services/orderApi";
import { useTranslation } from "react-i18next";

const BonusHistory = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        data,
        isLoading,
        error,
    } = useGetMyLast7OrdersQuery();

    const orders = data?.payload ?? [];

    const getStatus = (status?: string): string => {
        switch (status?.toLowerCase().trim()) {
            case "pending":
                return "В обробці";

            case "processing":
                return "Обробляється";

            case "delivered":
            case "completed":
                return "Виконано";

            case "cancelled":
            case "canceled":
                return "Скасовано";

            case "shipped":
                return "Відправлено";

            default:
                return status || "Не вказано";
        }
    };

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

                <p>
                    Не вдалося завантажити замовлення
                </p>
            </div>
        );
    }

    return (
        <div className="bonus-history">
            <div className="history-header">
                <h2>
                    {t(
                        "profile.bonusHistory.title"
                    )}
                </h2>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/orders")
                    }
                >
                    {t(
                        "profile.bonusHistory.viewAll"
                    )}
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            {t(
                                "profile.bonusHistory.orderNumber"
                            )}
                        </th>

                        <th>
                            {t(
                                "profile.bonusHistory.date"
                            )}
                        </th>

                        <th>
                            {t(
                                "profile.bonusHistory.status"
                            )}
                        </th>

                        <th>
                            {t(
                                "profile.bonusHistory.amount"
                            )}
                        </th>

                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            onClick={() =>
                                navigate(
                                    `/orders/${order.id}`
                                )
                            }
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <td>
                                №
                                {
                                    order.orderNumber
                                }
                            </td>

                            <td>
                                {order.date
                                    ? new Date(
                                          order.date
                                      ).toLocaleDateString(
                                          "uk-UA"
                                      )
                                    : "—"}
                            </td>

                            <td>
                                {getStatus(
                                    order.status
                                )}
                            </td>

                            <td>
                                {order.totalPrice !=
                                null
                                    ? `${order.totalPrice.toLocaleString(
                                          "uk-UA"
                                      )} грн`
                                    : "—"}
                            </td>

                            <td className="arrow">
                                ›
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BonusHistory;
