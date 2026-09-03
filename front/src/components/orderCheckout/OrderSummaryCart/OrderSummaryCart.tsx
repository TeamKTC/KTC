import React from "react";

import "./OrderSummaryCart.css";

import { useGetCartQuery } from "../../../store/services/cartApi";
import { useGetAllProductsQuery } from "../../../store/services/productApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";

import type { Product } from "../../../types/types";

interface OrderSummaryProps {
    delivery: string;
    usedBonuses: number;
    promoCode: string;
    promoDiscount: number;
    isSubmitting?: boolean;
}

const ProductImage = ({
    productId,
}: {
    productId: string;
}) => {
    const { data } =
        useGetMediaByProductIdQuery(productId);

    const image =
        data?.payload?.[0]?.url;

    return (
        <img
            className="checkout-summary-product__image"
            src={
                image ||
                "/placeholder.png"
            }
            alt=""
        />
    );
};

const OrderSummaryCart: React.FC<
    OrderSummaryProps
> = ({
    delivery,
    usedBonuses,
    promoCode,
    promoDiscount,
    isSubmitting = false,
}) => {
    const {
        data: cartData,
        isLoading: isCartLoading,
        isError: isCartError,
    } = useGetCartQuery();

    const {
        data: productsData,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useGetAllProductsQuery();

    if (
        isCartLoading ||
        isProductsLoading
    ) {
        return (
            <div className="checkout-summary">
                <h2 className="checkout-summary__title">
                    Ваше замовлення
                </h2>

                <p>Завантаження...</p>
            </div>
        );
    }

    if (
        isCartError ||
        isProductsError
    ) {
        return (
            <div className="checkout-summary">
                <h2 className="checkout-summary__title">
                    Ваше замовлення
                </h2>

                <p>
                    Не вдалося завантажити
                    товари.
                </p>
            </div>
        );
    }

    const cart =
        cartData?.payload;

    const products: Product[] =
        productsData?.payload ?? [];

    if (!cart) {
        return (
            <div className="checkout-summary">
                <h2 className="checkout-summary__title">
                    Ваше замовлення
                </h2>

                <p>
                    Кошик порожній.
                </p>
            </div>
        );
    }

    const cartProducts =
        (cart.items ?? [])
            .map((cartItem) => {
                const product =
                    products.find(
                        (item) =>
                            item.id ===
                            cartItem.productId
                    );

                if (!product) {
                    return null;
                }

                return {
                    cartItem,
                    product,
                };
            })
            .filter(
                (
                    item
                ): item is {
                    cartItem:
                        (typeof cart.items)[number];
                    product: Product;
                } => item !== null
            );

    const totalCount =
        (cart.items ?? []).reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    const productsTotal =
        cartProducts.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                    item.cartItem.quantity,
            0
        );

    const productDiscount =
        cartProducts.reduce(
            (sum, item) => {
                const {
                    product,
                    cartItem,
                } = item;

                if (
                    product.oldPrice != null &&
                    product.oldPrice >
                        product.price
                ) {
                    return (
                        sum +
                        (
                            product.oldPrice -
                            product.price
                        ) *
                            cartItem.quantity
                    );
                }

                return sum;
            },
            0
        );

    const deliveryPrice =
        delivery === "pickup"
            ? 0
            : null;

    const total =
        Math.max(
            0,
            productsTotal -
                promoDiscount -
                usedBonuses
        );

    const formatPrice = (
        value: number
    ) =>
        value.toLocaleString(
            "uk-UA"
        );

    return (
        <div className="checkout-summary">
            <h2 className="checkout-summary__title">
                Ваше замовлення
            </h2>

            {/* ТОВАРИ */}
            <div className="checkout-summary__products">
                {cartProducts.map(
                    ({
                        cartItem,
                        product,
                    }) => (
                        <div
                            className="checkout-summary-product"
                            key={
                                cartItem.productId
                            }
                        >
                            <ProductImage
                                productId={
                                    product.id
                                }
                            />

                            <div className="checkout-summary-product__content">
                                <div className="checkout-summary-product__top">
                                    <p className="checkout-summary-product__name">
                                        {
                                            product.name
                                        }
                                    </p>
                                </div>

                                <div className="checkout-summary-product__bottom">
                                    <div className="checkout-summary-product__quantity">
                                        <span>
                                            Кількість:
                                        </span>

                                        <span className="checkout-summary-product__quantity-value">
                                            {
                                                cartItem.quantity
                                            }
                                        </span>
                                    </div>

                                    <span className="checkout-summary-product__price">
                                        {formatPrice(
                                            product.price *
                                                cartItem.quantity
                                        )}{" "}
                                        грн
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* ДЕТАЛІ */}
            <div className="checkout-summary__details">
                <div className="checkout-summary__row">
                    <span>
                        Товари ({totalCount})
                    </span>

                    <strong>
                        {formatPrice(
                            productsTotal
                        )}{" "}
                        грн
                    </strong>
                </div>

                <div className="checkout-summary__row">
                    <span>
                        Доставка
                    </span>

                    <span>
                        {deliveryPrice === 0
                            ? "0 грн"
                            : "За тарифами перевізника"}
                    </span>
                </div>

                <div className="checkout-summary__row">
                    <span>
                        Знижка
                    </span>

                    <span>
                        {productDiscount >
                        0
                            ? `- ${formatPrice(
                                  productDiscount
                              )} грн`
                            : "0 грн"}
                    </span>
                </div>

                <div className="checkout-summary__row">
                    <span>
                        Промокод
                        {promoCode
                            ? ` (${promoCode})`
                            : ""}
                    </span>

                    <span>
                        {promoDiscount >
                        0
                            ? `- ${formatPrice(
                                  promoDiscount
                              )} грн`
                            : "0 грн"}
                    </span>
                </div>

                <div className="checkout-summary__row">
                    <span>
                        Бонуси
                    </span>

                    <span>
                        {usedBonuses >
                        0
                            ? `- ${formatPrice(
                                  usedBonuses
                              )} грн`
                            : "0 грн"}
                    </span>
                </div>
            </div>

            <div className="summary-divider" />

            {/* ФІНАЛ */}
            <div className="checkout-summary__total">
                <strong>
                    До сплати
                </strong>

                <strong>
                    {formatPrice(
                        total
                    )}{" "}
                    грн
                </strong>
            </div>

            {/* ОСЬ ТЕПЕР ЦЕ SUBMIT */}
            <button
                type="submit"
                form="checkout-form"
                className="checkout-summary__button"
                disabled={
                    cartProducts.length === 0 ||
                    isSubmitting
                }
            >
                {isSubmitting
                    ? "Оформлення..."
                    : "Підтвердити покупки"}
            </button>
        </div>
    );
};

export default OrderSummaryCart;