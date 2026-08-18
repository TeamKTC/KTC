import "./BonusHistory.css";
import { useGetMyOrdersQuery } from "../../../store/services/orderApi";

const BonusHistory = () => {
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

                <button>Переглянути всі</button>
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