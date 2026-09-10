import {
    Package,
    ShieldCheck,
    RotateCcw,
    Wrench,
} from "lucide-react";

const FAQSection = () => {
    const questions = [
        {
            title: "Статус замовлення",
            text: "Перевірте актуальний статус вашого замовлення",
            icon: Package,
        },
        {
            title: "Гарантія",
            text: "Інформація про гарантію на наші товари",
            icon: ShieldCheck,
        },
        {
            title: "Повернення товару",
            text: "Умови та процес повернення товарів",
            icon: RotateCcw,
        },
        {
            title: "Статус ремонту",
            text: "Перевірте етап та готовність ремонту",
            icon: Wrench,
        },
    ];

    return (
        <section className="support-faq">
            <h2>Часті запити:</h2>

            <div className="support-faq-list">
                {questions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            type="button"
                            className="support-faq-card"
                            key={item.title}
                        >
                            <Icon size={28} strokeWidth={1.5} />

                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQSection;