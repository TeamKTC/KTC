import { Link, Navigate, useLocation } from "react-router-dom";
import "./OrderSuccessPage.css";

interface OrderSuccessState {
    orderId?: string;
    orderNumber?: string;
    totalPrice?: number;
    status?: string;
}

const OrderSuccessPage = () => {
    const location = useLocation();

    const state = location.state as OrderSuccessState | null;

    if (!state?.orderNumber) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="order-success-page">
            <div className="order-success">
                <div className="success-icon">✓</div>

                <h1>Замовлення успішно оформлено!</h1>

                <p className="success-description">
                    Дякуємо за покупку. Ми вже отримали
                    ваше замовлення та почали його обробку.
                </p>

                <div className="order-info">
                    <div className="order-info-row">
                        <span>Номер замовлення</span>
                        <strong>#{state.orderNumber}</strong>
                    </div>

                    <div className="order-info-row">
                        <span>Сума замовлення</span>
                        <strong>
                            {state.totalPrice?.toLocaleString("uk-UA")} грн
                        </strong>
                    </div>

                    <div className="order-info-row">
                        <span>Статус</span>
                        <strong>{state.status ?? "Прийнято"}</strong>
                    </div>
                </div>

                <Link
                    to="/orders"
                    className="order-success-button"
                >
                    Перейти до моїх замовлень
                </Link>

                <Link
                    to="/"
                    className="continue-shopping"
                >
                    Продовжити покупки
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;