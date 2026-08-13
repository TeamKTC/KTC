import {
    ShieldCheck,
    Wrench,
    Award,
    Headset,
} from "lucide-react";

import "./WarrantyFeatures.css";

const WarrantyFeatures = () => {
    return (
        <section className="warranty-features">

            <div className="warranty-feature-card">
                <div className="warranty-feature-icon">
                    <ShieldCheck size={42} strokeWidth={1.5} />
                </div>

                <div className="warranty-feature-content">
                    <h3>Офіційна гарантія</h3>

                    <p>
                        Ми надаємо гарантію від
                        офіційних постачальників на всі товари.
                    </p>

                    <a href="#">
                        Детальніше <span>›</span>
                    </a>
                </div>
            </div>

            <div className="warranty-feature-card">
                <div className="warranty-feature-icon">
                    <Wrench size={42} strokeWidth={1.5} />
                </div>

                <div className="warranty-feature-content">
                    <h3>Сервісне обслуговування</h3>

                    <p>
                        Професійне обслуговування
                        брендів наших товарів в Україні.
                    </p>

                    <a href="#">
                        Детальніше <span>›</span>
                    </a>
                </div>
            </div>

            <div className="warranty-feature-card">
                <div className="warranty-feature-icon">
                    <Award size={42} strokeWidth={1.5} />
                </div>

                <div className="warranty-feature-content">
                    <h3>Гарантія виробника</h3>

                    <p>
                        Термін та умови гарантії
                        відповідають стандартам виробника.
                    </p>

                    <a href="#">
                        Детальніше <span>›</span>
                    </a>
                </div>
            </div>

            <div className="warranty-feature-card">
                <div className="warranty-feature-icon">
                    <Headset size={42} strokeWidth={1.5} />
                </div>

                <div className="warranty-feature-content">
                    <h3>Підтримка 27/7</h3>

                    <p>
                        Ми завжди на зв'язку та готові
                        допомогти з будь-якими питаннями.
                    </p>

                    <a href="#">
                        Детальніше <span>›</span>
                    </a>
                </div>
            </div>

        </section>
    );
};

export default WarrantyFeatures;