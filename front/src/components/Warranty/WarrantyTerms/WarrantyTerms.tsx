import {
    Laptop,
    Smartphone,
    Mouse,
    WashingMachine,
    Info,
} from "lucide-react";

import "./WarrantyTerms.css";

const WarrantyTerms = () => {
    return (
        <section className="warranty-terms">
            <h2 className="warranty-terms-title">
                Термін гарантії за категоріями товарів
            </h2>

            <div className="warranty-table-wrapper">
                <table className="warranty-table">
                    <thead>
                        <tr>
                            <th>Каталог товарів</th>
                            <th>Гарантійний талон</th>
                            <th>Умови гарантії</th>
                            <th>Примітки</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="warranty-category">
                                    <Laptop size={20} strokeWidth={1.4} />
                                    <span>Ноутбуки</span>
                                </div>
                            </td>

                            <td>12-24 місяці</td>

                            <td>
                                Відповідно до гарантії виробника
                            </td>

                            <td>
                                Деталі на сторінці товару
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="warranty-category">
                                    <Smartphone size={20} strokeWidth={1.4} />
                                    <span>Смартфони</span>
                                </div>
                            </td>

                            <td>12 місяців</td>

                            <td>
                                Відповідно до гарантії виробника
                            </td>

                            <td>
                                Діє при наявності чека та
                                <br />
                                гарантійного талона
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="warranty-category">
                                    <Mouse size={20} strokeWidth={1.4} />
                                    <span>Аксесуари</span>
                                </div>
                            </td>

                            <td>6-12 місяців</td>

                            <td>
                                Відповідно до гарантії виробника
                            </td>

                            <td>
                                Гарантія не поширюється на
                                <br />
                                витратні елементи
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="warranty-category">
                                    <WashingMachine
                                        size={20}
                                        strokeWidth={1.4}
                                    />
                                    <span>Побутова техніка</span>
                                </div>
                            </td>

                            <td>12-36 місяців</td>

                            <td>
                                Відповідно до гарантії виробника
                            </td>

                            <td>
                                Уточнюйте умови у картці товару
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="warranty-terms-note">
                <Info size={16} strokeWidth={1.5} />

                <span>
                    Термін доставки можуть змінюватися залежно від
                    наявності товарів та вашого регіону
                </span>
            </div>
        </section>
    );
};

export default WarrantyTerms;