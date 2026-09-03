import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import "./OrderCheckoutPage.css";

import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import CheckoutForm from "../../components/orderCheckout/CheckoutForm/CheckoutForm";
import OrderSummaryCart from "../../components/orderCheckout/OrderSummaryCart/OrderSummaryCart";

import { useCreateOrderMutation } from "../../store/services/orderApi";

interface CheckoutState {
    usedBonuses?: number;
    promoCode?: string;
    promoCodeId?: string;
    promoDiscount?: number;
}

const OrderCheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state =
        location.state as CheckoutState | null;

    const [usedBonuses, setUsedBonuses] =
        useState(state?.usedBonuses ?? 0);

    const [promoCode] =
        useState(state?.promoCode ?? "");

    const [promoCodeId] =
        useState(state?.promoCodeId ?? "");

    const [promoDiscount] =
        useState(state?.promoDiscount ?? 0);

    const [delivery, setDelivery] =
        useState("pickup");

    const [
        createOrder,
        {
            isLoading: isSubmitting,
        },
    ] = useCreateOrderMutation();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData =
            new FormData(event.currentTarget);

        const deliveryType = String(
            formData.get("deliveryType") ?? "pickup"
        );

        const city = String(
            formData.get("city") ?? ""
        ).trim();

        const department = String(
            formData.get("department") ?? ""
        ).trim();

        const address = String(
            formData.get("address") ?? ""
        ).trim();

        const paymentType = String(
            formData.get("paymentType") ?? "cash"
        );

        const installmentBank = String(
            formData.get("installmentBank") ?? ""
        ).trim();

        const comment = String(
            formData.get("comment") ?? ""
        ).trim();

        console.log(
            "CHECKOUT FORM DATA:",
            {
                deliveryType,
                city,
                department,
                address,
                paymentType,
                installmentBank,
                comment,
                usedBonuses,
                promoCode,
                promoCodeId,
                promoDiscount,
            }
        );

        try {
            const result =
                await createOrder({
                    date: new Date().toISOString(),

                    status: "Pending",

                    promoCodeId:
                        promoCodeId || null,

                    usedBonuses,

                    deliveryType,

                    city:
                        deliveryType === "pickup"
                            ? null
                            : city,

                    department:
                        deliveryType === "nova"
                            ? department
                            : null,

                    address:
                        deliveryType === "courier"
                            ? address
                            : null,

                    paymentType,

                    installmentBank:
                        paymentType === "installment"
                            ? installmentBank
                            : null,

                    comment:
                        comment || null,
                }).unwrap();

            if (!result.isSuccess) {
                throw new Error(
                    result.message ||
                        "Не вдалося оформити замовлення"
                );
            }

            const orderId =
                result.payload?.orderId;

            const orderNumber =
                result.payload?.orderNumber;

            const totalPrice =
                result.payload?.totalPrice ?? 0;

            const productsTotal =
                result.payload?.productsTotal ?? 0;

            const finalPromoDiscount =
                result.payload?.promoDiscount ?? 0;

            const finalUsedBonuses =
                result.payload?.usedBonuses ?? 0;

            console.log(
                "ORDER CREATED:",
                {
                    orderId,
                    orderNumber,
                    totalPrice,
                    productsTotal,
                    promoDiscount:
                        finalPromoDiscount,
                    usedBonuses:
                        finalUsedBonuses,
                }
            );

            navigate("/order-success", {
                replace: true,

                state: {
                    orderCreated: true,

                    orderId,

                    orderNumber,

                    totalPrice,

                    productsTotal,

                    promoDiscount:
                        finalPromoDiscount,

                    usedBonuses:
                        finalUsedBonuses,
                },
            });
        } catch (error) {
            console.error(
                "CREATE ORDER ERROR:",
                error
            );

            const message =
                error instanceof Error
                    ? error.message
                    : "Не вдалося оформити замовлення";

            alert(message);
        }
    };

    return (
        <div className="profile-page">

            <div className="breadcrumbs">

                <Link to="/">
                    Головна
                </Link>

                <span> &gt; </span>

                <Link to="/cart">
                    Кошик
                </Link>

                <span> &gt; </span>

                <span>
                    Оформлення замовлення
                </span>

            </div>

            <h1 className="profile-title">
                Оформлення замовлення
            </h1>

            <form
                id="checkout-form"
                onSubmit={handleSubmit}
            >

                <div className="checkout-layout">

                    <CheckoutForm
                        delivery={delivery}
                        onDeliveryChange={
                            setDelivery
                        }
                        usedBonuses={
                            usedBonuses
                        }
                        onBonusesChange={
                            setUsedBonuses
                        }
                    />

                    <OrderSummaryCart
                        delivery={delivery}
                        usedBonuses={
                            usedBonuses
                        }
                        promoCode={promoCode}
                        promoDiscount={
                            promoDiscount
                        }
                        isSubmitting={
                            isSubmitting
                        }
                    />

                </div>

            </form>

            <FooterBenefits />

        </div>
    );
};

export default OrderCheckoutPage;