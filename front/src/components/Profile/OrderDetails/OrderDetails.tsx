import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import {
    X,
    MapPin,
    CreditCard,
    Package,
} from "lucide-react";

import {
    useGetOrderByIdQuery,
} from "../../../store/services/orderApi";

import {
    useGetOrderItemsByOrderIdQuery,
} from "../../../store/services/orderItemApi";

import {
    useGetAllProductsQuery,
} from "../../../store/services/productApi";

import {
    useGetMediaByProductIdQuery,
} from "../../../store/services/mediaApi";

interface OrderProductProps {
    productId: string;
    quantity: number;
    price: number;
    productName?: string;
}

const OrderProduct = ({
    productId,
    quantity,
    price,
    productName,
}: OrderProductProps) => {
    const { data: mediaData } =
        useGetMediaByProductIdQuery(productId, {
            skip: !productId,
        });

    const media = mediaData?.payload ?? [];

    const itemTotal = price * quantity;

    const image = media.find((file) => {
        const fileName = String(
            (file as any).fileName ??
                (file as any).name ??
                ""
        ).toLowerCase();

        return (
            fileName.endsWith(".jpg") ||
            fileName.endsWith(".jpeg") ||
            fileName.endsWith(".png") ||
            fileName.endsWith(".webp")
        );
    }) ?? media[0];

    const imageUrl =
        image &&
        String(
            (image as any).url ??
                (image as any).fileUrl ??
                (image as any).path ??
                ""
        );

    return (
        <div className="odp-product">
            <div className="odp-product-image">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={productName || "Товар"}
                    />
                ) : (
                    <Package size={20} />
                )}
            </div>

            <div className="odp-product-info">
                <strong>
                    {productName ||
                        `Товар #${productId}`}
                </strong>

                <span>
                    Кількість: {quantity}
                </span>
            </div>

            <div className="odp-product-price">
                <span>
                    {price > 0
                        ? `${itemTotal.toLocaleString(
                              "uk-UA"
                          )} грн`
                        : "Ціна не вказана"}
                </span>

                <small>
                    {price > 0
                        ? `${price.toLocaleString(
                              "uk-UA"
                          )} грн / шт.`
                        : "Ціна не вказана"}
                </small>
            </div>
        </div>
    );
};

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useGetOrderByIdQuery(id ?? "", {
        skip: !id,
    });

    const {
        data: orderItemsData,
        isLoading: isOrderItemsLoading,
        isFetching: isOrderItemsFetching,
    } = useGetOrderItemsByOrderIdQuery(id ?? "", {
        skip: !id,
    });

    const {
        data: productsData,
        isLoading: isProductsLoading,
        isFetching: isProductsFetching,
    } = useGetAllProductsQuery();

    const order = data?.payload;

    if (
        isLoading ||
        isFetching ||
        isOrderItemsLoading ||
        isOrderItemsFetching ||
        isProductsLoading ||
        isProductsFetching
    ) {
        return (
            <div className="odp-order-details">
                <div className="odp-empty">
                    Завантаження замовлення...
                </div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="odp-order-details">
                <div className="odp-empty">
                    <strong>
                        Не вдалося завантажити замовлення
                    </strong>

                    <div style={{ marginTop: 12 }}>
                        <button
                            type="button"
                            className="odp-close"
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            ← Назад до замовлень
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const items = orderItemsData?.payload ?? [];
    const products = productsData?.payload ?? [];

    const productsTotal = items.reduce(
        (sum, item) => {
            const product = products.find(
                (product) =>
                    product.id === item.productId
            );

            const price =
                Number(item.price) > 0
                    ? Number(item.price)
                    : Number(product?.price ?? 0);

            return (
                sum +
                price * Number(item.quantity ?? 0)
            );
        },
        0
    );

    const promoDiscount = Number(
        order.promoDiscount ?? 0
    );

    const usedBonuses = Number(
        order.usedBonuses ?? 0
    );

    const totalPrice = Number(
        order.totalPrice ?? 0
    );

    const formatPrice = (value: number): string => {
        return value.toLocaleString("uk-UA");
    };

    const formatDate = (date?: string): string => {
        if (!date) {
            return "—";
        }

        const parsed = new Date(date);

        if (Number.isNaN(parsed.getTime())) {
            return "—";
        }

        return parsed.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getStatus = (status?: string): string => {
        switch (status?.toLowerCase().trim()) {
            case "pending":
                return "В обробці";

            case "processing":
                return "Обробляється";

            case "delivered":
            case "completed":
                return "Доставлено";

            case "cancelled":
            case "canceled":
                return "Скасовано";

            default:
                return status || "Не вказано";
        }
    };

    const getStatusClass = (
        status?: string
    ): string => {
        switch (status?.toLowerCase().trim()) {
            case "pending":
            case "processing":
                return "odp-status-warning";

            case "delivered":
            case "completed":
                return "odp-status-success";

            case "cancelled":
            case "canceled":
                return "odp-status-danger";

            default:
                return "odp-status-default";
        }
    };

    const getDelivery = (
        type?: string,
        address?: string | null
    ): string => {
        switch (type?.toLowerCase().trim()) {
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

                return type || "Не вказано";
        }
    };

    const getPayment = (type?: string): string => {
        switch (type?.toLowerCase().trim()) {
            case "cash":
                return "Готівкою";

            case "card":
                return "Оплата карткою";

            case "installment":
                return "Оплата частинами";

            case "credit":
                return "Кредит";

            default:
                return type || "Не вказано";
        }
    };

    const handleClose = (): void => {
        navigate("/profile");
    };

    return (
        <div className="odp-order-details">
            <div className="odp-header">
                <div className="odp-title">
                    <div className="odp-icon">
                        <Package size={20} />
                    </div>

                    <div>
                        <h2>
                            Замовлення №
                            {order.orderNumber}
                        </h2>

                        <span>
                            {formatDate(order.date)}
                        </span>
                    </div>
                </div>

                <div className="odp-actions">
                    <div
                        className={`odp-status ${getStatusClass(
                            order.status
                        )}`}
                    >
                        {getStatus(order.status)}
                    </div>

                    <button
                        type="button"
                        className="odp-close"
                        onClick={handleClose}
                        aria-label="Закрити"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="odp-content">
                <section className="odp-card">
                    <div className="odp-section-title">
                        <Package size={17} />
                        <h3>Товари</h3>
                        <span>{items.length}</span>
                    </div>

                    {items.length > 0 ? (
                        <div className="odp-products">
                            {items.map((item) => {
                                const product =
                                    products.find(
                                        (product) =>
                                            product.id ===
                                            item.productId
                                    );

                                const price =
                                    Number(item.price) > 0
                                        ? Number(item.price)
                                        : Number(
                                              product?.price ??
                                                  0
                                          );

                                return (
                                    <OrderProduct
                                        key={item.id}
                                        productId={
                                            item.productId
                                        }
                                        quantity={Number(
                                            item.quantity ??
                                                0
                                        )}
                                        price={price}
                                        productName={
                                            product?.name
                                        }
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="odp-empty">
                            У замовленні немає товарів
                        </div>
                    )}

                    <div className="odp-products-total">
                        <span>
                            Вартість товарів
                        </span>

                        <strong>
                            {formatPrice(
                                productsTotal
                            )}{" "}
                            грн
                        </strong>
                    </div>
                </section>

                <section className="odp-card">
                    <div className="odp-section-title">
                        <MapPin size={17} />
                        <h3>Доставка</h3>
                    </div>

                    <div className="odp-info-list">
                        <div className="odp-info-row">
                            <span>
                                Спосіб доставки
                            </span>

                            <strong>
                                {getDelivery(
                                    order.deliveryType,
                                    order.address
                                )}
                            </strong>
                        </div>

                        {order.city && (
                            <div className="odp-info-row">
                                <span>Місто</span>

                                <strong>
                                    {order.city}
                                </strong>
                            </div>
                        )}

                        {order.department && (
                            <div className="odp-info-row">
                                <span>
                                    Відділення
                                </span>

                                <strong>
                                    {order.department}
                                </strong>
                            </div>
                        )}

                        {order.address && (
                            <div className="odp-info-row">
                                <span>Адреса</span>

                                <strong>
                                    {order.address}
                                </strong>
                            </div>
                        )}

                        {order.comment && (
                            <div className="odp-info-row">
                                <span>
                                    Коментар
                                </span>

                                <strong>
                                    {order.comment}
                                </strong>
                            </div>
                        )}
                    </div>
                </section>

                <section className="odp-card">
                    <div className="odp-section-title">
                        <CreditCard size={17} />
                        <h3>Оплата</h3>
                    </div>

                    <div className="odp-info-list">
                        <div className="odp-info-row">
                            <span>
                                Вартість товарів
                            </span>

                            <strong>
                                {formatPrice(
                                    productsTotal
                                )}{" "}
                                грн
                            </strong>
                        </div>

                        {promoDiscount > 0 && (
                            <div className="odp-info-row">
                                <span>
                                    Знижка за промокодом
                                </span>

                                <strong>
                                    -{" "}
                                    {formatPrice(
                                        promoDiscount
                                    )}{" "}
                                    грн
                                </strong>
                            </div>
                        )}

                        {usedBonuses > 0 && (
                            <div className="odp-info-row">
                                <span>
                                    Використано бонусів
                                </span>

                                <strong>
                                    -{" "}
                                    {formatPrice(
                                        usedBonuses
                                    )}{" "}
                                    грн
                                </strong>
                            </div>
                        )}

                        <div className="odp-info-row odp-total-row">
                            <span>До сплати</span>

                            <strong>
                                {formatPrice(
                                    totalPrice
                                )}{" "}
                                грн
                            </strong>
                        </div>

                        <div className="odp-info-row">
                            <span>
                                Спосіб оплати
                            </span>

                            <strong>
                                {getPayment(
                                    order.paymentType
                                )}
                            </strong>
                        </div>

                        {order.installmentBank && (
                            <div className="odp-info-row">
                                <span>Банк</span>

                                <strong>
                                    {
                                        order.installmentBank
                                    }
                                </strong>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OrderDetails;

