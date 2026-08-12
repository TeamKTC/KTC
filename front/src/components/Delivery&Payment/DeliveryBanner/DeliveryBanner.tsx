import { ShieldCheck, Truck } from "lucide-react";
import "./DeliveryBanner.css";

const DeliveryBanner = () => {
    return (
        <section className="delivery-banner">
            <div className="delivery-banner-icon">
                <Truck size={78} strokeWidth={1.2} />
            </div>

            <div className="delivery-banner-content">
                <h2>Зручно, швидко та надійно</h2>

                <p>
                    Ми доставляємо ваші замовлення по всій Україні та пропонуємо
                    різні способи доставки онлайн.
                </p>

                <p>
                    Оберіть найбільш зручний варіант - і ми подбаємо про все інше.
                </p>
            </div>

            <div className="delivery-banner-security">
                <ShieldCheck size={72} strokeWidth={1.2} />

                <div className="security-text">
                    <strong>Ваше замовлення під</strong>
                    <span>надійним захистом</span>
                </div>
            </div>
        </section>
    );
};

export default DeliveryBanner;