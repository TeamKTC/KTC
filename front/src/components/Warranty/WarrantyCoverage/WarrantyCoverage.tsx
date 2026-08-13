import {
    Check,
    X,
} from "lucide-react";

import "./WarrantyCoverage.css";

const WarrantyCoverage = () => {
    return (
        <section className="warranty-coverage">

            <div className="warranty-coverage-card warranty-coverage-positive">
                <h2>Що покриває гарантія?</h2>

                <ul className="warranty-coverage-list">
                    <li>
                        <Check size={13} />
                        <span>
                            Заводські дефекти матеріалів та збірки
                        </span>
                    </li>

                    <li>
                        <Check size={13} />
                        <span>
                            Несправності, що виникли з вини виробника
                        </span>
                    </li>

                    <li>
                        <Check size={13} />
                        <span>
                            Безкоштовний ремонт або заміна товару
                        </span>
                    </li>

                    <li>
                        <Check size={13} />
                        <span>
                            Офіційне сервісне обслуговування
                        </span>
                    </li>

                    <li>
                        <Check size={13} />
                        <span>
                            Підтримка наших спеціалістів на всіх етапах
                        </span>
                    </li>
                </ul>
            </div>

            <div className="warranty-coverage-card warranty-coverage-negative">
                <h2>Що не покриває гарантія?</h2>

                <ul className="warranty-coverage-list">
                    <li>
                        <X size={13} />
                        <span>
                            Заводські дефекти матеріалів та збірки
                        </span>
                    </li>

                    <li>
                        <X size={13} />
                        <span>
                            Несправності, що виникли з вини виробника
                        </span>
                    </li>

                    <li>
                        <X size={13} />
                        <span>
                            Безкоштовний ремонт або заміна товару
                        </span>
                    </li>

                    <li>
                        <X size={13} />
                        <span>
                            Офіційне сервісне обслуговування
                        </span>
                    </li>

                    <li>
                        <X size={13} />
                        <span>
                            Підтримка наших спеціалістів на всіх етапах
                        </span>
                    </li>
                </ul>
            </div>

        </section>
    );
};

export default WarrantyCoverage;