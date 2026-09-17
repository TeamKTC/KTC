import {
    X,
    RotateCcw,
    Truck,
    MapPin,
    CreditCard,
    Coins,
    Package,
} from "lucide-react";

import type { Order } from "../../../store/services/orderApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";

import "./OrderDetails.css";

interface OrderDetailsProps {
    order: Order;
    onClose: () => void;
    onRepeat: () => void;
}

interface OrderProductProps {
    productId: string;
    quantity: number;
    price: number;
}

const formatMoney = (value: number | null | undefined) => {
    return Number(value ?? 0).toLocaleString("uk-UA");
};

const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const getStatusText = (status?: string) => {
    switch (status?.toLowerCase().trim()) {
        case "pending":
            return "Очікує обробки";

        case "processing":
            return "В обробці";

        case "delivered":
        case "completed":
            return "Доставлено";

        case "cancelled":
        case "canceled":
            return "Скасовано";

        default:
            return status || "Невідомо";
    }
};

const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase().trim()) {
        case "delivered":
        case "completed":
            return "success";

        case "cancelled":
        case "canceled":
            return "danger";

        case "processing":
            return "warning";

        default:
            return "default";
    }
};

const getDeliveryText = (deliveryType?: string, address?: string | null) => {
    switch (deliveryType?.toLowerCase().trim()) {
        case "pickup":
            return "Самовивіз";

        case "nova":
        case "novaposhta":
        case "nova_poshta":
            return "Нова пошта";

        case "courier":
            return "Кур'єр";

        default:
            if (address?.trim()) {
                return "Кур'єр";
            }

            return deliveryType || "Не вказано";
    }
};

const getPaymentText = (paymentType?: string) => {
    switch (paymentType?.toLowerCase().trim()) {
        case "cash":
            return "Готівкою";

        case "card":
            return "Оплата карткою";

        case "installment":
            return "Оплата частинами";

        case "credit":
            return "Кредит";

        default:
            return paymentType || "Не вказано";
    }
};

const OrderProduct = ({
    productId,
    quantity,
    price,
}: OrderProductProps) => {
    const { data } = useGetMediaByProductIdQuery(productId);

    const imageUrl = data?.payload?.[0]?.url || "";

    const itemTotal =
        Number(price ?? 0) * Number(quantity ?? 0);

    return (
        <div className="order-details-product">
            <div className="order-details-product-image">
                {imageUrl ? (
                    <img src={imageUrl} alt="Товар" />
                ) : (
                    <Package size={22} />
                )}
            </div>

            <div className="order-details-product-info">
                <strong>Товар</strong>

                <span>
                    Кількість: {quantity}
                </span>
            </div>

            <div className="order-details-product-price">
                <span>
                    {formatMoney(price)} грн
                </span>

                <small>
                    {formatMoney(itemTotal)} грн
                </small>
            </div>
        </div>
    );
};

const OrderDetails = ({
    order,
    onClose,
    onRepeat,
}: OrderDetailsProps) => {
    const items = order.items ?? [];

    const productsTotal = items.reduce(
        (sum, item) =>
            sum +
            Number(item.price ?? 0) *
                Number(item.quantity ?? 0),
        0
    );

    const deliveryPrice: number = 0;

    const promoDiscount = Number(
        order.promoDiscount ?? 0
    );

    const usedBonuses = Number(
        order.usedBonuses ?? 0
    );

    const totalPrice = Number(
        order.totalPrice ?? 0
    );

    const statusText = getStatusText(order.status);

    return (
        <div className="order-details-block">
            {/* HEADER */}
            <div className="order-details-header">
                <div className="order-details-title">
                    <div className="order-details-icon">
                        <Package size={21} />
                    </div>

                    <div>
                        <h2>
                            Замовлення №
                            {order.orderNumber}
                        </h2>

                        <span>
                            від {formatDate(order.date)}
                        </span>
                    </div>
                </div>

                <div className="order-details-actions">
                    <span
                        className={`order-status order-status-${getStatusClass(
                            order.status
                        )}`}
                    >
                        {statusText}
                    </span>

                    <button
                        type="button"
                        className="order-details-repeat"
                        onClick={onRepeat}
                    >
                        <RotateCcw size={15} />
                        Повторити
                    </button>

                    <button
                        type="button"
                        className="order-details-close"
                        onClick={onClose}
                        aria-label="Закрити"
                    >
                        <X size={19} />
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="order-details-content">

                {/* PRODUCTS */}
                <section className="order-details-card order-details-products">
                    <div className="order-details-section-title">
                        <Package size={18} />

                        <h3>
                            Товари
                        </h3>

                        <span>
                            {items.length}
                        </span>
                    </div>

                    <div className="order-products-list">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <OrderProduct
                                    key={item.id}
                                    productId={item.productId}
                                    quantity={item.quantity}
                                    price={item.price}
                                />
                            ))
                        ) : (
                            <div className="order-empty">
                                Товарів у замовленні немає
                            </div>
                        )}
                    </div>

                    <div className="order-details-total">
                        <span>
                            Вартість товарів
                        </span>

                        <strong>
                            {formatMoney(productsTotal)} грн
                        </strong>
                    </div>
                </section>

                {/* DELIVERY */}
                <section className="order-details-card">
                    <div className="order-details-section-title">
                        <Truck size={18} />

                        <h3>
                            Доставка
                        </h3>
                    </div>

                    <div className="order-info-list">
                        <div className="order-info-item">
                            <div className="order-info-icon">
                                <Truck size={17} />
                            </div>

                            <div>
                                <span>
                                    Спосіб доставки
                                </span>

                                <strong>
                                    {getDeliveryText(
                                        order.deliveryType,
                                        order.address
                                    )}
                                </strong>
                            </div>
                        </div>

                        <div className="order-info-item">
                            <div className="order-info-icon">
                                <MapPin size={17} />
                            </div>

                            <div>
                                <span>
                                    Місто
                                </span>

                                <strong>
                                    {order.city || "Не вказано"}
                                </strong>
                            </div>
                        </div>

                        {(order.department ||
                            order.address) && (
                            <div className="order-info-item">
                                <div className="order-info-icon">
                                    <MapPin size={17} />
                                </div>

                                <div>
                                    <span>
                                        Відділення / адреса
                                    </span>

                                    <strong>
                                        {order.department ||
                                            order.address ||
                                            "Не вказано"}
                                    </strong>
                                </div>
                            </div>
                        )}

                        <div className="order-info-item">
                            <div className="order-info-icon">
                                <Package size={17} />
                            </div>

                            <div>
                                <span>
                                    Коментар
                                </span>

                                <strong>
                                    {order.comment ||
                                        "Без коментаря"}
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAYMENT */}
                <section className="order-details-card">
                    <div className="order-details-section-title">
                        <CreditCard size={18} />

                        <h3>
                            Оплата
                        </h3>
                    </div>

                    <div className="order-payment-list">
                        <div className="order-payment-row">
                            <span>
                                Товари
                            </span>

                            <strong>
                                {formatMoney(productsTotal)} грн
                            </strong>
                        </div>

                        <div className="order-payment-row">
                            <span>
                                Доставка
                            </span>

                            <strong>
                                {deliveryPrice === 0
                                    ? "Безкоштовно"
                                    : `${formatMoney(
                                          deliveryPrice
                                      )} грн`}
                            </strong>
                        </div>

                        {promoDiscount > 0 && (
                            <div className="order-payment-row discount">
                                <span>
                                    Знижка
                                </span>

                                <strong>
                                    −
                                    {formatMoney(
                                        promoDiscount
                                    )} грн
                                </strong>
                            </div>
                        )}

                        <div className="order-payment-divider" />

                        <div className="order-payment-total">
                            <span>
                                До сплати
                            </span>

                            <strong>
                                {formatMoney(totalPrice)} грн
                            </strong>
                        </div>
                    </div>

                    <div className="order-payment-method">
                        <CreditCard size={18} />

                        <div>
                            <span>
                                Спосіб оплати
                            </span>

                            <strong>
                                {getPaymentText(
                                    order.paymentType
                                )}
                            </strong>
                        </div>
                    </div>

                    {usedBonuses > 0 && (
                        <div className="order-payment-bonus">
                            <Coins size={19} />

                            <div>
                                <span>
                                    Використано бонусів
                                </span>

                                <strong>
                                    {formatMoney(
                                        usedBonuses
                                    )}
                                </strong>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default OrderDetails;
