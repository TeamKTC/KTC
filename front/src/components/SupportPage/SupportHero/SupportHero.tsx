import { Headphones, Search } from "lucide-react";

const SupportHero = () => {
    return (
        <section className="support-hero">
            <div className="support-hero-content">
                <h2>Ми допоможемо з будь-яким питанням</h2>

                <p>
                    Наша команда підтримки готова вам швидко та професійно
                    допомогти
                </p>

                <div className="support-search">
                    <input
                        type="text"
                        placeholder="Пошук"
                    />
                    <Search size={20} />
                </div>
            </div>

            <div className="support-hero-icon">
                <Headphones size={92} strokeWidth={1.4} />
            </div>
        </section>
    );
};

export default SupportHero;