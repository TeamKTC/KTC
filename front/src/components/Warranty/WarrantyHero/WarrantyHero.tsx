import { ShieldCheck, BadgeCheck, KeyRound } from "lucide-react";
import "./WarrantyHero.css";

const WarrantyHero = () => {
    return (
        <section className="warranty-hero">

            <div className="warranty-hero-main">
                <div className="warranty-hero-icon">
                    <ShieldCheck size={64} strokeWidth={1.5} />
                </div>

                <div className="warranty-hero-text">
                    <h2>
                        Офіційна гарантія та надійний захист ваших покупок
                    </h2>

                    <p>
                        Ми співпрацюємо лише з офіційними постачальниками та
                        виробниками, тому гарантуємо справжню гарантію на всі товари.
                    </p>

                    <span>
                        У разі потреби ви можете розраховувати на швидкий сервіс
                        та підтримку.
                    </span>
                </div>
            </div>

            <div className="warranty-hero-right">

                <div className="warranty-hero-item">
                    <BadgeCheck size={36} strokeWidth={1.5} />

                    <div>
                        <h3>Тільки оригінальні товари</h3>
                        <p>
                            Сертифікована продукція
                            з офіційною гарантією.
                        </p>
                    </div>
                </div>

                <div className="warranty-hero-item">
                    <KeyRound size={36} strokeWidth={1.5} />

                    <div>
                        <h3>Захист ваших прав</h3>
                        <p>
                            Прозорі умови гарантії відповідно
                            до законодавства.
                        </p>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default WarrantyHero;