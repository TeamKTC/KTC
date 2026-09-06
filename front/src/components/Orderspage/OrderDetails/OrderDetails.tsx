import {
    X,
    RotateCcw,
    Truck,
    MapPin,
    CreditCard,
    Coins,
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

const OrderProduct = ({
    productId,
    quantity,
    price,
}: OrderProductProps) => {
    const { data } =
        useGetMediaByProductIdQuery(productId);

    const imageUrl =
        data?.payload?.[0]?.url || "";

    return (
        <div className="order-details-product">
            <div className="order-details-product-image">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Товар"
                    />
                ) : (
                    <span>—</span>
                )}
            </div>

            <div className="order-details-product-info">
                <p>
                    Товар
                </p>

                <span>
                    Кількість: {quantity}
                </span>
            </div>

            <strong>
                {Number(price ?? 0).toLocaleString(
                    "uk-UA"
                )}{" "}
                грн
            </strong>
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

    const promoDiscount =
        Number(order.promoDiscount ?? 0);

    const usedBonuses =
        Number(order.usedBonuses ?? 0);

    const totalPrice =
        Number(order.totalPrice ?? 0);

    const formatDate = (
        date: string
    ) => {
        if (!date) {
            return "-";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "uk-UA",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        );
    };

    const getStatusText = (
        status: string
    ) => {
        switch (
            status
                ?.toLowerCase()
                .trim()
        ) {
            case "pending":
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

    const getDeliveryText = () => {
        switch (
            order.deliveryType
                ?.toLowerCase()
                .trim()
        ) {
            case "pickup":
                return "Самовивіз";

            case "nova":
                return "Нова пошта";

            case "courier":
                return "Кур'єр";

            default:
                if (
                    order.address &&
                    order.address.trim() !== ""
                ) {
                    return "Кур'єр";
                }

                return "Не вказано";
        }
    };

    const getPaymentText = () => {
        switch (
            order.paymentType
                ?.toLowerCase()
                .trim()
        ) {
            case "cash":
                return "Готівкою";

            case "card":
                return "Оплата карткою";

            case "installment":
                return "Оплата частинами";

            case "credit":
                return "Кредит";

            default:
                return order.paymentType || "Не вказано";
        }
    };

    return (
        <div className="order-details-block">
            <div className="order-details-header">
                <h2>
                    Деталі замовлення №
                    {order.orderNumber}
                </h2>

                <span className="order-details-date">
                    {getStatusText(order.status)}{" "}
                    {formatDate(order.date)}
                </span>

                <button
                    type="button"
                    className="order-details-repeat"
                    onClick={onRepeat}
                >
                    <RotateCcw size={16} />
                    Повторити
                </button>

                <button
                    type="button"
                    className="order-details-close"
                    onClick={onClose}
                >
                    <X />
                </button>
            </div>

            <div className="order-details-content">
                <div className="order-details-products">
                    <h3>
                        Товари
                    </h3>

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
                        <div className="order-details-product">
                            Товарів немає
                        </div>
                    )}

                    <div className="order-details-total">
                        <span>
                            Разом
                        </span>

                        <strong>
                            {productsTotal.toLocaleString(
                                "uk-UA"
                            )}{" "}
                            грн
                        </strong>
                    </div>
                </div>

                <div className="order-details-info">
                    <h3>
                        Інформація про доставку
                    </h3>

                    <div className="order-info-item">
                        <MapPin className="order-info-icon" />

                        <div>
                            <p>
                                Місто
                            </p>

                            <strong>
                                {order.city ||
                                    "Не вказано"}
                            </strong>
                        </div>
                    </div>

                    <div className="order-info-item">
                        <Truck className="order-info-icon" />

                        <div>
                            <p>
                                Відділення / адреса
                            </p>

                            <strong>
                                {order.department ||
                                    order.address ||
                                    "Не вказано"}
                            </strong>
                        </div>
                    </div>

                    <div className="order-info-item">
                        <Truck className="order-info-icon" />

                        <div>
                            <p>
                                Спосіб доставки
                            </p>

                            <strong>
                                {getDeliveryText()}
                            </strong>
                        </div>
                    </div>

                    <div className="order-info-item">
                        <MapPin className="order-info-icon" />

                        <div>
                            <p>
                                Коментар
                            </p>

                            <strong>
                                {order.comment ||
                                    "Без коментаря"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="order-details-payment">
                    <h3>
                        Оплата
                    </h3>

                    <div className="order-payment-row">
                        <span>
                            Товари
                        </span>

                        <strong>
                            {productsTotal.toLocaleString(
                                "uk-UA"
                            )}{" "}
                            грн
                        </strong>
                    </div>

                    <div className="order-payment-row">
                        <span>
                            Доставка
                        </span>

                        <strong>
                            {deliveryPrice === 0
                                ? "Безкоштовно"
                                : `${deliveryPrice.toLocaleString(
                                      "uk-UA"
                                  )} грн`}
                        </strong>
                    </div>

                    {promoDiscount > 0 && (
                        <div className="order-payment-row">
                            <span>
                                Знижка
                            </span>

                            <strong>
                                -
                                {promoDiscount.toLocaleString(
                                    "uk-UA"
                                )}{" "}
                                грн
                            </strong>
                        </div>
                    )}

                    <div className="order-payment-divider" />

                    <div className="order-payment-total">
                        <span>
                            До сплати
                        </span>

                        <strong>
                            {totalPrice.toLocaleString(
                                "uk-UA"
                            )}{" "}
                            грн
                        </strong>
                    </div>

                    <div className="order-payment-bonus">
                        <Coins className="order-bonus-icon" />

                        <div className="order-bonus-content">
                            <p>
                                Використано бонусів
                            </p>

                            <strong>
                                {usedBonuses}
                            </strong>

                            <small>
                                Бонуси використані
                                при оформленні
                                замовлення
                            </small>
                        </div>
                    </div>

                    <div className="order-payment-row">
                        <span>
                            Спосіб оплати
                        </span>

                        <strong>
                            {getPaymentText()}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

