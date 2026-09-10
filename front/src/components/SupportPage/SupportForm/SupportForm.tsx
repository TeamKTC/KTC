import { Paperclip, ChevronDown } from "lucide-react";

const SupportForm = () => {
    return (
        <section className="support-form-section">
            <h2>Напишіть нам</h2>

            <form className="support-form">
                <div className="support-form-grid">
                    <div className="support-form-field">
                        <label>Ваше ім’я</label>
                        <input
                            type="text"
                            placeholder="Введіть ім’я"
                        />
                    </div>

                    <div className="support-form-field">
                        <label>Телефон</label>
                        <input
                            type="tel"
                            placeholder="+380 XX XXX XX XX"
                        />
                    </div>

                    <div className="support-form-field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Електронна пошта"
                        />
                    </div>

                    <div className="support-form-field">
                        <label>Тема звернення</label>

                        <div className="support-select">
                            <select defaultValue="">
                                <option value="" disabled>
                                    Оберіть тему
                                </option>
                                <option value="order">
                                    Статус замовлення
                                </option>
                                <option value="warranty">
                                    Гарантія
                                </option>
                                <option value="return">
                                    Повернення товару
                                </option>
                                <option value="repair">
                                    Статус ремонту
                                </option>
                            </select>

                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                <div className="support-form-field">
                    <label>Повідомлення</label>
                    <textarea placeholder="Опишіть ваше питання ..." />
                </div>

                <label className="support-file">
                    <Paperclip size={15} />
                    <span>Прикріпити фото/документ</span>
                    <input type="file" />
                </label>

                <button
                    type="submit"
                    className="support-submit"
                >
                    Надіслати заявку
                </button>
            </form>
        </section>
    );
};

export default SupportForm;