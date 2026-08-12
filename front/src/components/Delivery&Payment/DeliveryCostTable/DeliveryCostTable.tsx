import {
    Box,
    Smartphone,
    UserRound,
    ShoppingCart,
    Info,
} from "lucide-react";

import "./DeliveryCostTable.css";

interface DeliveryCost {
    icon: React.ElementType;
    method: string;
    term: string;
    cost: string;
    freeFrom: string;
}

const deliveryCosts: DeliveryCost[] = [
    {
        icon: Box,
        method: "Нова Пошта(відділення)",
        term: "1-3 дні",
        cost: "від 70 грн",
        freeFrom: "2 000 грн",
    },
    {
        icon: Smartphone,
        method: "Поштомат Нової Пошти",
        term: "1-3 дні",
        cost: "від 50 грн",
        freeFrom: "2 000 грн",
    },
    {
        icon: UserRound,
        method: "Кур'єрська доставка PixelRoom",
        term: "1-2 дні",
        cost: "від 120 грн",
        freeFrom: "2 000 грн",
    },
    {
        icon: ShoppingCart,
        method: "Самовивіз (шоурум)",
        term: "У день замовлення",
        cost: "Безкоштовно",
        freeFrom: "-",
    },
];

const DeliveryCostTable = () => {
    return (
        <section className="delivery-cost-section">
            <h2 className="delivery-cost-title">
                Терміни та вартість доставки
            </h2>

            <div className="delivery-cost-table-wrapper">
                <table className="delivery-cost-table">
                    <thead>
                        <tr>
                            <th>Спосіб доставки</th>
                            <th>Термін доставки</th>
                            <th>Вартість</th>
                            <th>Безкоштовно від</th>
                        </tr>
                    </thead>

                    <tbody>
                        {deliveryCosts.map((item) => {
                            const Icon = item.icon;

                            return (
                                <tr key={item.method}>
                                    <td>
                                        <div className="delivery-method">
                                            <Icon
                                                size={20}
                                                strokeWidth={1.3}
                                            />

                                            <span>{item.method}</span>
                                        </div>
                                    </td>

                                    <td>{item.term}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.freeFrom}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="delivery-cost-note">
                <Info
                    size={16}
                    strokeWidth={1.5}
                />

                <span>
                    Термін доставки можуть змінюватися залежно від
                    наявності товарів та вашого регіону
                </span>
            </div>
        </section>
    );
};

export default DeliveryCostTable;