import {
    Phone,
    MessageSquare,
    Mail,
} from "lucide-react";

const ContactSection = () => {
    const contacts = [
        {
            title: "Телефони",
            text: (
                <>
                    <span>0 800 543 786</span>
                    <span>Щодня з 8:00 до 21:00</span>
                </>
            ),
            icon: Phone,
            button: "Зателефонувати",
        },
        {
            title: "Онлайн чат",
            text: (
                <>
                    <span>Напишіть нам у чат на сайті,</span>
                    <span>відповідаємо швидко</span>
                </>
            ),
            icon: MessageSquare,
            button: "Відкрити чат",
        },
        {
            title: "Email",
            text: (
                <>
                    <span>support@pixelroom.com</span>
                    <span>Відповідь протягом 24 години</span>
                </>
            ),
            icon: Mail,
            button: "Написати",
        },
    ];

    return (
        <section className="support-contact">
            <h2>Як з нами зв’язатись?</h2>

            <div className="support-contact-card">
                {contacts.map((contact) => {
                    const Icon = contact.icon;

                    return (
                        <div
                            className="support-contact-item"
                            key={contact.title}
                        >
                            <div className="support-contact-icon">
                                <Icon size={32} strokeWidth={1.4} />
                            </div>

                            <h3>{contact.title}</h3>

                            <div className="support-contact-text">
                                {contact.text}
                            </div>

                            <button type="button">
                                {contact.button}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ContactSection;