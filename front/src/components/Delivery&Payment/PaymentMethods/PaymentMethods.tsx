import {
    CreditCard,
    Banknote,
    WalletCards,
    FileText,
} from "lucide-react";

import "./PaymentMethods.css";

const paymentMethods = [
    {
        title: "Оплата карткою",
        description: "Visa, Mastercard, Apple Pay та Google Pay.",
        icon: CreditCard,
    },
    {
        title: "Готівка при отриманні",
        description:
            "Оплата замовлення готівкою у відділенні або кур'єру.",
        icon: Banknote,
    },
    {
        title: "Оплата частинами",
        description:
            "Покупка частинами від наших банків-партнерів.",
        icon: WalletCards,
    },
    {
        title: "Безготівковий рахунок",
        description:
            "Оплата для юридичних осіб за рахунком.",
        icon: FileText,
    },
];

const PaymentMethods = () => {
    return (
        <section className="payment-section">
            <h2 className="payment-section-title">
                Способи оплати
            </h2>

            <div className="payment-methods-grid">
                {paymentMethods.map((method) => {
                    const Icon = method.icon;

                    return (
                        <div
                            className="payment-method-card"
                            key={method.title}
                        >
                            <div className="payment-method-icon">
                                <Icon size={48} strokeWidth={1.5} />
                            </div>

                            <div>
                                <h3>{method.title}</h3>

                                <p>{method.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PaymentMethods;