import "./OrderSummary.css";
import {
    Shield,
    X,
} from "lucide-react";
import { useState } from "react";

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

    /*
     * КОШИК
     */
    const {
        data: cartData,
        isLoading: isCartLoading,
        isError: isCartError,
    } = useGetCartQuery();


    /*
     * ТОВАРИ
     */
    const {
        data: productsData,
        isLoading: isProductsLoading,
        isError: isProductsError,
    } = useGetAllProductsQuery();


    /*
     * ПОТОЧНИЙ КОРИСТУВАЧ
     */
    const {
        data: userData,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useGetMeQuery();


    /*
     * ПРОМОКОД
     */
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


    const [promoDiscount, setPromoDiscount] =
        useState(0);


    /*
     * БОНУСИ
     */
    const [useBonuses, setUseBonuses] =
        useState(false);


    /*
     * LOADING
     */
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


    /*
     * ERROR
     */
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


    /*
     * ДАНІ
     */
    const cart =
        cartData?.payload;

    const products: Product[] =
        productsData?.payload ?? [];

    const user =
        userData?.payload;


    /*
     * ЯКЩО НЕМАЄ КОШИКА
     */
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


    /*
     * ТОВАРИ КОШИКА
     */
    const cartProducts =
        cart.items
            .map((cartItem) => {

                const product =
                    products.find(
                        (product) =>
                            product.id ===
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
                        typeof cart.items[number];
                    product: Product;
                } =>
                    item !== null
            );


    /*
     * КІЛЬКІСТЬ ТОВАРІВ
     */
    const totalCount =
        cart.items.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    /*
     * СУМА ТОВАРІВ
     *
     * Ціна вже зі знижкою товару
     */
    const totalPrice =
        cartProducts.reduce(
            (total, item) =>
                total +
                item.product.price *
                item.cartItem.quantity,
            0
        );


    /*
     * ЗНИЖКА ТОВАРІВ
     *
     * oldPrice - price
     */
    const discount =
        cartProducts.reduce(
            (total, item) => {

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
                        total +
                        (
                            product.oldPrice -
                            product.price
                        ) *
                        cartItem.quantity
                    );
                }

                return total;
            },
            0
        );


    /*
     * БОНУСИ КОРИСТУВАЧА
     */
    const bonusBalance =
        user?.bonusBalance ?? 0;


    /*
     * МАКСИМАЛЬНО МОЖНА
     * СПИСАТИ 30% ВІД СУМИ
     */
    const maxBonusUsage =
        totalPrice * 0.3;


    const usedBonuses =
        useBonuses
            ? Math.min(
                bonusBalance,
                maxBonusUsage
            )
            : 0;


    /*
     * ФІНАЛЬНА СУМА
     */
    const finalPrice =
        Math.max(
            0,
            totalPrice -
            promoDiscount -
            usedBonuses
        );


    /*
     * ФОРМАТУВАННЯ ЦІНИ
     */
    const formatPrice = (
        price: number
    ) => {

        return `${price.toLocaleString(
            "uk-UA"
        )} грн`;

    };


    /*
     * ЗАСТОСУВАТИ ПРОМОКОД
     */
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
                    orderAmount:
                        totalPrice,
                }).unwrap();


            /*
             * ПРОМОКОД УСПІШНО
             * ЗАСТОСОВАНИЙ
             */
            if (
                result.isSuccess &&
                result.payload?.isValid
            ) {

                setAppliedPromoCode(
                    result.payload.code
                );

                setPromoDiscount(
                    result.payload.discountAmount
                );

                setPromoCode("");

            } else {

                setPromoDiscount(0);

                alert(
                    result.message ||
                    result.payload?.message ||
                    "Промокод не можна використати"
                );
            }

        } catch (error: any) {

            setPromoDiscount(0);

            alert(
                error?.data?.message ||
                "Не вдалося перевірити промокод"
            );
        }
    };


    /*
     * СКАСУВАТИ ПРОМОКОД
     */
    const handleRemovePromo = () => {

        setAppliedPromoCode("");

        setPromoDiscount(0);

        setPromoCode("");
    };


    /*
     * ОФОРМЛЕННЯ
     */
    const handleCheckout = () => {

        if (onCheckout) {

            onCheckout();

            return;
        }

        console.log(
            "Оформлення замовлення",
            {
                cartId: cart.id,

                promoCode:
                    appliedPromoCode || null,

                promoDiscount,

                useBonuses,

                usedBonuses,

                totalPrice,

                discount,

                finalPrice,
            }
        );
    };


    return (
        <div className="order-summary">

            <h2>
                Підсумок замовлення
            </h2>


            {/* СУМА ТОВАРІВ */}

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


            {/* ДОСТАВКА */}

            <div className="summary-row">

                <span>
                    Доставка
                </span>

                <strong>
                    Безкоштовно
                </strong>

            </div>


            {/* ЗНИЖКА */}

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




           


            {/* БОНУСИ */}

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


            {/* ДО СПЛАТИ */}

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


            {/* ПРОМОКОД */}

            <div className="promo-title">
                У вас є промокод
            </div>


            {appliedPromoCode ? (

                /*
                 * ПРОМОКОД ЗАСТОСОВАНИЙ
                 */
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
                        aria-label="Скасувати промокод"
                    >
                        <X
                            size={16}
                            strokeWidth={2}
                        />
                    </button>

                </div>

            ) : (

                /*
                 * ПРОМОКОД НЕ ЗАСТОСОВАНИЙ
                 */
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
                        onClick={handlePromo}
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


            {/* БОНУСИ */}

            <div className="bonus-block">

                <div>

                    <strong>
                        Доступно {bonusBalance} бонусів
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


            {/* ОФОРМИТИ */}

            <button
                type="button"
                className="checkout-button"
                onClick={handleCheckout}
                disabled={
                    cart.items.length === 0
                }
            >
                Оформити замовлення
            </button>


            {/* ПРОДОВЖИТИ */}

            <button
                type="button"
                className="continue-button"
                onClick={() =>
                    window.history.back()
                }
            >
                Продовжити покупку
            </button>


            {/* БЕЗПЕЧНА ОПЛАТА */}

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