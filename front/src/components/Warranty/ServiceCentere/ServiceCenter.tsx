import {
    MapPin,
    Phone,
    Clock,
    Mail,
} from "lucide-react";

import "./ServiceCenter.css";

const ServiceCenter = () => {
    return (
        <section className="service-center-wrapper">

            <h2>Сервісний центр PixelRoom</h2>

            <div className="service-center">

                <div className="service-center-item">
                    <MapPin size={32} strokeWidth={1.3} />

                    <div>
                        <span>Адреса</span>
                        <p>
                            м.Київ,вул.Соборна, 58<br />
                            (бізнес-центр “PixelRoom”) 1 поверх
                        </p>
                    </div>
                </div>

                <div className="service-center-item">
                    <Phone size={32} strokeWidth={1.3} />

                    <div>
                        <span>Телефон</span>
                        <p>
                            0 800 543 786<br />
                            (безкоштовно по Україні)<br />
                            067123 76 15
                        </p>
                    </div>
                </div>

                <div className="service-center-item">
                    <Clock size={32} strokeWidth={1.3} />

                    <div>
                        <span>Графік роботи</span>
                        <p>
                            Пн–Пт:09:00 – 20:00<br />
                            Сб-Нд:10:00 – 18:00<br />
                            Без вихідних
                        </p>
                    </div>
                </div>

                <div className="service-center-contact">

                    <button className="service-center-button">
                        Перейти до контактів
                    </button>

                    <div className="service-center-email">
                        <Mail size={0} />

                        <p>
                            Електронна пошта:
                            <strong>service@pixelroom.ua</strong>
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default ServiceCenter;