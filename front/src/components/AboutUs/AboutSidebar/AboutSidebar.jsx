import {
    House,
    Truck,
    ShieldCheck,
    Store,
    RefreshCw,
    Headphones,
} from "lucide-react";

import "./AboutSidebar.css";

const menuItems = [
    {
        title: "Про нас",
        icon: House,
    },
    {
        title: "Доставка",
        icon: Truck,
    },
    {
        title: "Гарантія",
        icon: ShieldCheck,
    },
    {
        title: "Магазин",
        icon: Store,
    },
    {
        title: "Повернення",
        icon: RefreshCw,
    },
    {
        title: "Підтримка",
        icon: Headphones,
    },
];

const AboutSidebar = () => {
    return (
        <aside className="about-sidebar">
            {menuItems.map(({ title, icon: Icon }) => (
                <div className="about-sidebar__item" key={title}>
                    <Icon className="about-sidebar__icon" />
                    <span>{title}</span>
                </div>
            ))}
        </aside>
    );
};

export default AboutSidebar;