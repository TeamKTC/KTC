import {
    ShieldCheck,
    Headphones,
    UserRoundCheck,
    MessageCircleReply,
} from "lucide-react";

const SupportBenefits = () => {
    const benefits = [
        {
            title: "Офіційна гарантія",
            text: "Гарантія від виробника",
            icon: ShieldCheck,
        },
        {
            title: "Підтримка 24/7",
            text: "Ми завжди на зв’язку",
            icon: Headphones,
        },
        {
            title: "Допомога експертів",
            text: "Професійні консультації",
            icon: UserRoundCheck,
        },
        {
            title: "Швидка відповідь",
            text: "Відповідаємо оперативно",
            icon: MessageCircleReply,
        },
    ];

    return (
        <section className="support-benefits">
            {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                    <div
                        className="support-benefit"
                        key={benefit.title}
                    >
                        <Icon size={30} strokeWidth={1.4} />

                        <div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default SupportBenefits;