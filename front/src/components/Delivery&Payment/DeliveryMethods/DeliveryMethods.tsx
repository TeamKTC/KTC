import {
    Building2,
    Truck,
    Store,
    PackageOpen,
    ArrowRight,
} from "lucide-react";

import "./DeliveryMethods.css";

const methods = [
    {
        title: "Нова пошта",
        description:
            "Доставка у відділення, поштомат або кур'єром Нової пошти.",
        icon: Building2,
    },
    {
        title: "Кур'єрська доставка",
        description:
            "Доставка кур'єром прямо до дверей вашого помешкання.",
        icon: Truck,
    },
    {
        title: "Самовивіз",
        description:
            "Заберіть замовлення самостійно у зручному для вас місці.",
        icon: Store,
    },
    {
        title: "Поштомат",
        description:
            "Швидка доставка замовлення у поштомат Нової пошти.",
        icon: PackageOpen,
    },
];

const DeliveryMethods = () => {
    return (
        <section className="delivery-section">
            <h2 className="delivery-section-title">
                Способи доставки
            </h2>

            <div className="delivery-methods-grid">
                {methods.map((method) => {
                    const Icon = method.icon;

                    return (
                        <div
                            className="delivery-method-card"
                            key={method.title}
                        >
                            <div className="delivery-method-icon">
                                <Icon size={44} strokeWidth={1.3} />
                            </div>

                            <div className="delivery-method-content">
                                <h3>{method.title}</h3>

                                <p>{method.description}</p>

                                <button type="button">
                                    Детальніше
                                    <ArrowRight size={13} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DeliveryMethods;