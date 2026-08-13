import {
    ShoppingCart,
    ShieldCheck,
    Truck,
    Package,
    ChevronRight,
} from "lucide-react";

import "./DeliverySteps.css";

interface DeliveryStep {
    title: string;
    description: string;
    icon: React.ElementType;
}

const steps: DeliveryStep[] = [
    {
        title: "Оформлення замовлення",
        description: "Виберіть товар та заповніть необхідні дані.",
        icon: ShoppingCart,
    },
    {
        title: "Підтвердження",
        description: "Ми зв'яжемося з вами для підтвердження замовлення.",
        icon: ShieldCheck,
    },
    {
        title: "Доставка",
        description: "Відправлення замовлення обраним способом доставки.",
        icon: Truck,
    },
    {
        title: "Отримання",
        description: "Отримайте товар та перевірте його стан.",
        icon: Package,
    },
];

const DeliverySteps = () => {
    return (
        <section className="steps-section">
            <h2 className="steps-section-title">
                Як відбувається доставка
            </h2>

            <div className="delivery-steps">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <div
                            className="delivery-step"
                            key={step.title}
                        >
                            <div className="step-icon">
                                <Icon
                                    size={44}
                                    strokeWidth={1.3}
                                />
                            </div>

                            <div className="step-content">
                                <h3>{step.title}</h3>

                                <p>{step.description}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="step-arrow">
                                    <ChevronRight
                                        size={90}
                                        strokeWidth={0.5}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DeliverySteps;