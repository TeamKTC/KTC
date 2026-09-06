import { useState } from "react";
import { Search } from "lucide-react";
import {
    useGetMyOrdersQuery,
    useCancelOrderMutation,
} from "../../../store/services/orderApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";
import CancelOrderModal from "../../../pages/Auth/CancelOrderModal/CancelOrderModal";
import OrderDetails from "../OrderDetails/OrderDetails";
import "./Orders.css";

type Filter =
    | "all"
    | "processing"
    | "delivered"
    | "cancelled";

const statusInfo: Record<
    string,
    {
        text: string;
        className: string;
    }
> = {
    pending: {
        text: "В обробці",
        className: "orders-status--processing",
    },
    processing: {
        text: "В обробці",
        className: "orders-status--processing",
    },
    delivered: {
        text: "Доставлено",
        className: "orders-status--delivered",
    },
    completed: {
        text: "Доставлено",
        className: "orders-status--delivered",
    },
    cancelled: {
        text: "Скасовано",
        className: "orders-status--cancelled",
    },
    canceled: {
        text: "Скасовано",
        className: "orders-status--cancelled",
    },
};

interface OrderProductImageProps {
    productId: string;
}

const OrderProductImage = ({
    productId,
}: OrderProductImageProps) => {
    const { data } =
        useGetMediaByProductIdQuery(productId);

    const media = data?.payload?.[0];
    const imageUrl = media?.url || "";

    if (!imageUrl) {
        return (
            <div className="order-product-image">
                <div className="order-product-placeholder">
                    —
                </div>
            </div>
        );
    }

    return (
        <div className="order-product-image">
            <img
                src={imageUrl}
                alt="Товар"
            />
        </div>
    );
};

const Orders = () => {
    const [activeFilter, setActiveFilter] =
        useState<Filter>("all");

    const [search, setSearch] =
        useState("");

    const [cancelOrderId, setCancelOrderId] =
        useState<string | null>(null);

    const [expandedOrderId, setExpandedOrderId] =
        useState<string | null>(null);

    const {
        data,
        isLoading,
        isError,
    } = useGetMyOrdersQuery();

    const [
        cancelOrder,
        { isLoading: isCancelling },
    ] = useCancelOrderMutation();

    const orders = data?.payload ?? [];

    const filteredOrders = orders.filter((order) => {
        const normalizedStatus =
            order.status?.toLowerCase().trim() ?? "";

        let matchesFilter = true;

        if (activeFilter === "processing") {
            matchesFilter =
                normalizedStatus === "pending" ||
                normalizedStatus === "processing";
        }

        if (activeFilter === "delivered") {
            matchesFilter =
                normalizedStatus === "delivered" ||
                normalizedStatus === "completed";
        }

        if (activeFilter === "cancelled") {
            matchesFilter =
                normalizedStatus === "cancelled" ||
                normalizedStatus === "canceled";
        }

        const matchesSearch =
            order.orderNumber
                ?.toLowerCase()
                .includes(
                    search.toLowerCase().trim()
                ) ?? false;

        return (
            matchesFilter &&
            matchesSearch
        );
    });

    const formatDate = (date: string) => {
        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

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

    const formatTime = (date: string) => {
        if (!date) {
            return "";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "";
        }

        return parsedDate.toLocaleTimeString(
            "uk-UA",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    const formatPrice = (price: number) => {
        return `${(
            price ?? 0
        ).toLocaleString("uk-UA")} грн`;
    };

    const getItems = (
        order: typeof orders[number]
    ) => {
        return order.items ?? [];
    };

    const getProductCount = (
        order: typeof orders[number]
    ) => {
        return getItems(order).reduce(
            (sum, item) =>
                sum +
                (item.quantity ?? 0),
            0
        );
    };

    const getProductWord = (
        count: number
    ) => {
        if (count === 1) {
            return "товар";
        }

        if (
            count >= 2 &&
            count <= 4
        ) {
            return "товари";
        }

        return "товарів";
    };

    const getStatus = (status: string) => {
        const normalizedStatus =
            status?.toLowerCase().trim() ?? "";

        return (
            statusInfo[
                normalizedStatus
            ] ?? {
                text:
                    status ||
                    "Невідомо",
                className: "",
            }
        );
    };

    const getDeliveryText = (
        order: typeof orders[number]
    ) => {
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
                return "Не вказано";
        }
    };

    const handleDetails = (
        orderId: string
    ) => {
        setExpandedOrderId(
            expandedOrderId === orderId
                ? null
                : orderId
        );
    };

    const handleRepeat = (
        orderId: string
    ) => {
        console.log(
            "Повторити замовлення:",
            orderId
        );
    };

    const handleCancel = async () => {
        if (!cancelOrderId) {
            return;
        }

        try {
            await cancelOrder(
                cancelOrderId
            ).unwrap();

            setCancelOrderId(null);

            if (
                expandedOrderId ===
                cancelOrderId
            ) {
                setExpandedOrderId(null);
            }
        } catch (error) {
            console.error(
                "Помилка скасування замовлення:",
                error
            );
        }
    };

    if (isLoading) {
        return (
            <div className="orders">
                <div className="orders-empty">
                    Завантаження
                    замовлень...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="orders">
                <div className="orders-empty">
                    Не вдалося
                    завантажити
                    замовлення
                </div>
            </div>
        );
    }

    return (
        <div className="orders">
            <div className="orders-filters">
                <button
                    type="button"
                    className={`orders-filter ${
                        activeFilter === "all"
                            ? "orders-filter--active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveFilter("all")
                    }
                >
                    Усі
                </button>

                <button
                    type="button"
                    className={`orders-filter ${
                        activeFilter === "processing"
                            ? "orders-filter--active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(
                            "processing"
                        )
                    }
                >
                    В обробці
                </button>

                <button
                    type="button"
                    className={`orders-filter ${
                        activeFilter === "delivered"
                            ? "orders-filter--active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(
                            "delivered"
                        )
                    }
                >
                    Доставлено
                </button>

                <button
                    type="button"
                    className={`orders-filter ${
                        activeFilter === "cancelled"
                            ? "orders-filter--active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(
                            "cancelled"
                        )
                    }
                >
                    Скасовано
                </button>
            </div>

            <div className="orders-search">
                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Пошук за номером замовлення..."
                />

                <Search size={22} />
            </div>

            <div className="orders-table-header">
                <div>
                    № замовлення
                </div>

                <div>
                    Дата
                </div>

                <div>
                    Статус
                </div>

                <div>
                    Сума
                </div>

                <div>
                    Склад замовлення
                </div>

                <div>
                    Дії
                </div>
            </div>

            <div className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(
                        (order) => {
                            const status =
                                getStatus(
                                    order.status
                                );

                            const items =
                                getItems(
                                    order
                                );

                            const productCount =
                                getProductCount(
                                    order
                                );

                            const normalizedStatus =
                                order.status
                                    ?.toLowerCase()
                                    .trim() ?? "";

                            const canCancel =
                                normalizedStatus ===
                                    "pending" ||
                                normalizedStatus ===
                                    "processing";

                            const isExpanded =
                                expandedOrderId ===
                                order.id;

                            return (
                                <div
                                    className="order-item-wrapper"
                                    key={order.id}
                                >
                                    <div className="order-row">
                                        <div className="order-number">
                                            <strong>
                                                №
                                                {
                                                    order.orderNumber
                                                }
                                            </strong>

                                            <span>
                                                Доставка:{" "}
                                                {
                                                    getDeliveryText(
                                                        order
                                                    )
                                                }
                                            </span>
                                        </div>

                                        <div className="order-date">
                                            <span>
                                                {
                                                    formatDate(
                                                        order.date
                                                    )
                                                }
                                            </span>

                                            <span>
                                                {
                                                    formatTime(
                                                        order.date
                                                    )
                                                }
                                            </span>
                                        </div>

                                        <div>
                                            <span
                                                className={`orders-status ${status.className}`}
                                            >
                                                <span className="orders-status-dot" />

                                                {
                                                    status.text
                                                }
                                            </span>
                                        </div>

                                        <div className="order-price">
                                            <strong>
                                                {
                                                    formatPrice(
                                                        order.totalPrice
                                                    )
                                                }
                                            </strong>

                                            <span>
                                                +
                                                {
                                                    order.usedBonuses ??
                                                    0
                                                }{" "}
                                                {
                                                    order.usedBonuses ===
                                                    1
                                                        ? "бонус"
                                                        : "бонусів"
                                                }
                                            </span>
                                        </div>

                                        <div className="order-products">
                                            <div className="order-product-images">
                                                {items
                                                    .slice(
                                                        0,
                                                        2
                                                    )
                                                    .map(
                                                        (
                                                            item
                                                        ) => (
                                                            <OrderProductImage
                                                                key={
                                                                    item.id
                                                                }
                                                                productId={
                                                                    item.productId
                                                                }
                                                            />
                                                        )
                                                    )}

                                                {items.length >
                                                    2 && (
                                                    <div className="order-product-more">
                                                        +
                                                        {
                                                            items.length -
                                                            2
                                                        }
                                                    </div>
                                                )}

                                                {items.length ===
                                                    0 && (
                                                    <div className="order-product-image">
                                                        <div className="order-product-placeholder">
                                                            —
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <strong>
                                                {
                                                    productCount
                                                }{" "}
                                                {
                                                    getProductWord(
                                                        productCount
                                                    )
                                                }
                                            </strong>
                                        </div>

                                        <div className="order-actions">
                                            <button
                                                type="button"
                                                className="order-details"
                                                onClick={() =>
                                                    handleDetails(
                                                        order.id
                                                    )
                                                }
                                            >
                                                {isExpanded
                                                    ? "Сховати"
                                                    : "Деталі"}
                                            </button>

                                            {canCancel ? (
                                                <button
                                                    type="button"
                                                    className="order-action"
                                                    disabled={
                                                        isCancelling
                                                    }
                                                    onClick={() =>
                                                        setCancelOrderId(
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    Скасувати
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="order-action"
                                                    onClick={() =>
                                                        handleRepeat(
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    Повторити
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <OrderDetails
                                            order={
                                                order
                                            }
                                            onClose={() =>
                                                setExpandedOrderId(
                                                    null
                                                )
                                            }
                                            onRepeat={() =>
                                                handleRepeat(
                                                    order.id
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            );
                        }
                    )
                ) : (
                    <div className="orders-empty">
                        Замовлень
                        не знайдено
                    </div>
                )}
            </div>

            {cancelOrderId && (
                <CancelOrderModal
                    onConfirm={handleCancel}
                    onClose={() =>
                        setCancelOrderId(null)
                    }
                    isLoading={
                        isCancelling
                    }
                />
            )}
        </div>
    );
};

export default Orders;

