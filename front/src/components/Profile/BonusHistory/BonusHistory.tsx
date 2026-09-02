import "./BonusHistory.css";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../../store/services/orderApi";

const BonusHistory = () => {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        error,
    } = useGetMyOrdersQuery();

    const orders = data?.payload ?? [];

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
                <h2>Мої замовлення</h2>

                <button
                    type="button"
                    onClick={() => navigate("/orders")}
                >
                    Переглянути всі
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>№ замовлення</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Сума</th>
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
                                №{order.orderNumber}
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
                                {order.status}
                            </td>

                            <td>
                                {order.totalPrice != null
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