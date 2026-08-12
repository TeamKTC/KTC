import {
    FileText,
    MessageCircle,
    Package,
    CircleCheck,
    ChevronRight,
} from "lucide-react";

import "./WarrantyProcess.css";

const WarrantyProcess = () => {
    return (
        <section className="warranty-process">
            <h2>Як використати гарантію</h2>

            <div className="warranty-process-container">
                <div className="warranty-process-step">
                    <FileText
                        className="warranty-process-icon"
                        size={36}
                        strokeWidth={1.2}
                    />

                    <div className="warranty-process-text">
                        <h3>Перевірте гарантію</h3>
                        <p>
                            Переконайтеся, що товар має
                            <br />
                            гарантійний талон
                        </p>
                    </div>
                </div>

                <ChevronRight
                    className="warranty-process-arrow"
                    size={26}
                    strokeWidth={1.1}
                />

                <div className="warranty-process-step">
                    <MessageCircle
                        className="warranty-process-icon"
                        size={36}
                        strokeWidth={1.2}
                    />

                    <div className="warranty-process-text">
                        <h3>Зверніться до нас</h3>
                        <p>
                            Повідомте про проблему через
                            <br />
                            форму або телефон
                        </p>
                    </div>
                </div>

                <ChevronRight
                    className="warranty-process-arrow"
                    size={26}
                    strokeWidth={1.1}
                />

                <div className="warranty-process-step">
                    <Package
                        className="warranty-process-icon"
                        size={36}
                        strokeWidth={1.2}
                    />

                    <div className="warranty-process-text">
                        <h3>Передайте товар</h3>
                        <p>
                            Доставте товар до сервісного
                            <br />
                            центру або надішліть нам
                        </p>
                    </div>
                </div>

                <ChevronRight
                    className="warranty-process-arrow"
                    size={26}
                    strokeWidth={1.1}
                />

                <div className="warranty-process-step">
                    <CircleCheck
                        className="warranty-process-icon"
                        size={36}
                        strokeWidth={1.2}
                    />

                    <div className="warranty-process-text">
                        <h3>Отримайте результат</h3>
                        <p>
                            Ми відремонтуємо або замінимо
                            <br />
                            товар у найкоротші терміни
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WarrantyProcess;