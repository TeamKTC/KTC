import { Phone, Mail } from "lucide-react";

import "./AboutContacts.css";

const AboutContacts = () => {
    return (
        <section className="about-contacts">
            <div className="about-contact">
                <Phone className="about-contact__icon" />

                <div className="about-contact__content">
                    <h3>Телефони call-центру</h3>

                    <a href="tel:0800543786">0 800 543 786</a>
                    <a href="tel:+380441234567">+ 38 (044) 123 45 67</a>
                    <a href="tel:+380501234567">+ 38 (050) 123 45 67</a>
                    <a href="tel:+380671234567">+ 38 (067) 123 45 67</a>
                </div>
            </div>

            <div className="about-contact">
                <Mail className="about-contact__icon" />

                <div className="about-contact__content">
                    <h3>
                        Адреси електронної пошти головного офісу
                    </h3>

                    <a href="mailto:info@pixelroom.ua">
                        info@pixelroom.ua
                    </a>

                    <a href="mailto:support@pixelroom.ua">
                        support@pixelroom.ua
                    </a>

                    <a href="mailto:business@pixelroom.ua">
                        business@pixelroom.ua
                    </a>

                    <a href="mailto:partners@pixelroom.ua">
                        partners@pixelroom.ua
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutContacts;