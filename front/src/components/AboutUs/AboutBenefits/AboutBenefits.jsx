import {
    RefreshCw,
    Wrench,
    Headphones,
    Gift,
    UserRound,
    ShieldCheck,
    Truck,
    CalendarDays,
    Store,
} from "lucide-react";

import "./AboutBenefits.css";

const benefits = [
    {
        title: "Обмін 14 днів",
        icon: RefreshCw,
    },
    {
        title: "Сервісний центр",
        icon: Wrench,
    },
    {
        title: "Підтримка щодня",
        icon: Headphones,
    },
    {
        title: "Бонусна програма",
        icon: Gift,
    },
    {
        title: "250 000+ клієнтів",
        icon: UserRound,
    },
    {
        title: "Офіційна стратегія",
        icon: ShieldCheck,
    },
    {
        title: (
            <>
                Безкоштовна доставка
                <br />
                від 5 000грн
            </>
        ),
        icon: Truck,
    },
    {
        title: "+7 років на ринку",
        icon: CalendarDays,
    },
    {
        title: "10 магазинів",
        icon: Store,
    },
];

const AboutBenefits = () => {
    return (
        <section className="about-benefits">
            {benefits.map(({ title, icon: Icon }, index) => (
                <div
                    className={`about-benefit about-benefit--${index + 1}`}
                    key={index}
                >
                    <Icon className="about-benefit__icon" />

                    <div className="about-benefit__title">
                        {title}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default AboutBenefits;