import "./FooterBenefits.css";
import {
    Truck,
    CreditCard,
    Shield,
    RotateCcw
} from "lucide-react";

const FooterBenefits = () => {
    return (
        <section className="footer-benefits">

            <div className="benefit">
                <Truck size={24} />
                <div className="benefit-text">
                    <h4>Доставка</h4>
                    <p>По Україні 1-3 дні</p>
                    <span>Самовивіз з магазинів</span>
                </div>
            </div>

            <div className="benefit">
                <CreditCard size={24} />
                <div className="benefit-text">
                    <h4>Оплата</h4>
                    <p>Готівкою, карткою онлайн або</p>
                    <span>частинами до 10 платежів</span>
                </div>
            </div>

            <div className="benefit">
                <Shield size={24} />
                <div className="benefit-text">
                    <h4>Гарантія</h4>
                    <p>12 місяців офіційної гарантії</p>
                    <span>Apple</span>
                </div>
            </div>

            <div className="benefit">
                <RotateCcw size={24} />
                <div className="benefit-text">
                    <h4>Повернення</h4>
                    <p>14 днів на повернення</p>
                    <span>товару</span>
                </div>
            </div>

        </section>
    );
};

export default FooterBenefits;