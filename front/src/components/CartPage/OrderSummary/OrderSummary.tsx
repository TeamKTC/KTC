import "./OrderSummary.css";

import {
    Shield,
    X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetCartQuery } from "../../../store/services/cartApi";
import { useGetAllProductsQuery } from "../../../store/services/productApi";
import { useGetMeQuery } from "../../../store/services/userApi";
import { useValidatePromoCodeMutation } from "../../../store/services/promoCodeApi";

import type { Product } from "../../../types/types";

interface OrderSummaryProps {
    onCheckout?: () => void;
}

const OrderSummary = ({
    onCheckout,
}: OrderSummaryProps) => {
    const navigate = useNavigate();

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

    const {
        data: userData,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useGetMeQuery();

    const [
        validatePromoCode,
        {
            isLoading: isPromoLoading,
        },
    ] = useValidatePromoCodeMutation();

    const [promoCode, setPromoCode] =
        useState("");

    const [appliedPromoCode, setAppliedPromoCode] =
        useState("");

    // ID застосованого промокоду
    const [appliedPromoCodeId, setAppliedPromoCodeId] =
        useState("");

    const [promoDiscount, setPromoDiscount] =
        useState(0);

    const [useBonuses, setUseBonuses] =
        useState(false);

    if (
        isCartLoading ||
        isProductsLoading ||
        isUserLoading
    ) {
        return (
            <div className="order-summary">
                <h2>
                    Підсумок замовлення
                </h2>

                <p>
                    Завантаження...
                </p>
            </div>
        );
    }

    if (
        isCartError ||
        isProductsError ||
        isUserError
    ) {
        return (
            <div className="order-summary">
                <h2>
                    Підсумок замовлення
                </h2>

                <p>
                    Не вдалося завантажити
                    дані замовлення.
                </p>
            </div>
        );
    }

    const cart =
        cartData?.payload;

    const products: Product[] =
        productsData?.payload ?? [];

    const user =
        userData?.payload;

    if (!cart) {
        return (
            <div className="order-summary">
                <h2>
                    Підсумок замовлення
                </h2>

                <p>
                    Кошик порожній
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
                } =>
                    item !== null
            );

    const totalCount =
        (cart.items ?? []).reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    const totalPrice =
        cartProducts.reduce(
            (sum, item) =>
                sum +
                item.product.price *
                    item.cartItem.quantity,
            0
        );

    const discount =
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

    const bonusBalance =
        user?.bonusBalance ?? 0;

    const maxBonusUsage =
        totalPrice * 0.3;

    const usedBonuses =
        useBonuses
            ? Math.min(
                bonusBalance,
                maxBonusUsage
            )
            : 0;

    const finalPrice =
        Math.max(
            0,
            totalPrice -
                promoDiscount -
                usedBonuses
        );

    const formatPrice = (
        value: number
    ) =>
        `${value.toLocaleString(
            "uk-UA"
        )} грн`;

    const handlePromo = async () => {
        const code =
            promoCode.trim();

        if (!code) {
            return;
        }

        try {
            const result =
                await validatePromoCode({
                    code,
                    orderAmount: totalPrice,
                }).unwrap();

            if (
                result.isSuccess &&
                result.payload?.isValid
            ) {
                setAppliedPromoCode(
                    result.payload.code
                );

                // ЗБЕРІГАЄМО ID ПРОМОКОДУ
                setAppliedPromoCodeId(
                    result.payload.promoCodeId
                );

                setPromoDiscount(
                    result.payload.discountAmount
                );

                setPromoCode("");
            } else {
                setPromoDiscount(0);
                setAppliedPromoCodeId("");

                alert(
                    result.message ||
                    result.payload?.message ||
                    "Промокод не можна використати"
                );
            }
        } catch (error: any) {
            setPromoDiscount(0);
            setAppliedPromoCodeId("");

            alert(
                error?.data?.message ||
                "Не вдалося перевірити промокод"
            );
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromoCode("");
        setAppliedPromoCodeId("");
        setPromoDiscount(0);
        setPromoCode("");
    };

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout();
            return;
        }

        navigate("/cart/checkout", {
            state: {
                usedBonuses,

                promoCode:
                    appliedPromoCode,

                // ПЕРЕДАЄМО ID ПРОМОКОДУ
                promoCodeId:
                    appliedPromoCodeId,

                promoDiscount,
            },
        });
    };

    return (
        <div className="order-summary">

            <h2>
                Підсумок замовлення
            </h2>

            <div className="summary-row">
                <span>
                    Сума товарів ({totalCount})
                </span>

                <strong>
                    {formatPrice(
                        totalPrice
                    )}
                </strong>
            </div>

            <div className="summary-row">
                <span>
                    Доставка
                </span>

                <strong>
                    Безкоштовно
                </strong>
            </div>

            <div className="summary-row">
                <span>
                    Знижка
                </span>

                <strong>
                    {discount > 0
                        ? `-${formatPrice(
                            discount
                        )}`
                        : "0 грн"}
                </strong>
            </div>

            {promoDiscount > 0 && (
                <div className="summary-row">
                    <span>
                        Промокод
                        {appliedPromoCode
                            ? ` (${appliedPromoCode})`
                            : ""}
                    </span>

                    <strong>
                        -{formatPrice(
                            promoDiscount
                        )}
                    </strong>
                </div>
            )}

            <div className="summary-row">
                <span>
                    Бонусів використано
                </span>

                <strong>
                    {usedBonuses > 0
                        ? `-${formatPrice(
                            usedBonuses
                        )}`
                        : "0 грн"}
                </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
                <span>
                    До сплати
                </span>

                <strong>
                    {formatPrice(
                        finalPrice
                    )}
                </strong>
            </div>

            <div className="vat">
                Усі ціни вказані з ПДВ
            </div>

            <div className="promo-title">
                У вас є промокод
            </div>

            {appliedPromoCode ? (
                <div className="applied-promo">

                    <div className="applied-promo-left">

                        <div className="applied-promo-code">

                            <span>
                                Промокод
                            </span>

                            <strong>
                                {appliedPromoCode}
                            </strong>

                        </div>

                        <strong className="applied-promo-discount">
                            -{formatPrice(
                                promoDiscount
                            )}
                        </strong>

                    </div>

                    <button
                        type="button"
                        className="remove-promo-button"
                        onClick={
                            handleRemovePromo
                        }
                    >
                        <X
                            size={16}
                            strokeWidth={2}
                        />
                    </button>

                </div>
            ) : (
                <div className="promo">

                    <input
                        type="text"
                        placeholder="Введіть промокод"
                        value={promoCode}
                        onChange={(event) =>
                            setPromoCode(
                                event.target.value.toUpperCase()
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter"
                            ) {
                                handlePromo();
                            }
                        }}
                    />

                    <button
                        type="button"
                        onClick={
                            handlePromo
                        }
                        disabled={
                            isPromoLoading ||
                            !promoCode.trim()
                        }
                    >
                        {isPromoLoading
                            ? "Перевірка..."
                            : "Застосувати"}
                    </button>

                </div>
            )}

            <div className="bonus-block">

                <div>

                    <strong>
                        Доступно{" "}
                        {bonusBalance} бонусів
                    </strong>

                    <span>
                        Списати бонуси
                    </span>

                </div>

                <label className="switch">

                    <input
                        type="checkbox"
                        checked={useBonuses}
                        onChange={(event) =>
                            setUseBonuses(
                                event.target.checked
                            )
                        }
                    />

                    <span />

                </label>

            </div>

            <button
                type="button"
                className="checkout-button"
                onClick={
                    handleCheckout
                }
                disabled={
                    cart.items.length === 0
                }
            >
                Оформити замовлення
            </button>

            <button
                type="button"
                className="continue-button"
                onClick={() =>
                    window.history.back()
                }
            >
                Продовжити покупку
            </button>

            <div className="safe-payment">

                <Shield
                    className="safe-icon"
                    size={32}
                    strokeWidth={1.5}
                />

                <div>

                    <strong>
                        Безпечна оплата
                    </strong>

                    <p>
                        Ваші дані під захистом.
                        Оплата онлайн або
                        при отриманні
                    </p>

                </div>

            </div>

        </div>
    );
};

export default OrderSummary;