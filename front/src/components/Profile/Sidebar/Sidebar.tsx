import "./Sidebar.css";
import {
    User,
    Package,
    Heart,
    MapPin,
    Gift,
    Settings,
    LogOut,
    Wallet,
} from "lucide-react";

const Sidebar = () => {
    return (
<aside className="sidebar">

    <div className="user-card">

        <div className="avatar">
            H
        </div>

        <div className="user-info">
            <h3>Ім'я Прізвище</h3>
            <p>user123sdf@gmail.com</p>
            <span>+380 60 345 455 67</span>
        </div>

    </div>

    <div className="bonus-card-mini">

        <div className="bonus-text">
            <small>Бонусний баланс</small>
            <h4>1 250 бонусів</h4>
            <span>1 бонус = 1 грн</span>
        </div>

        <Wallet className="wallet-icon"/>

    </div>

    <div className="menu-divider"></div>

    <nav className="menu">
        
        <a className="menu-item active">
            <User />
            <span>Мій профіль</span>
        </a>

        <a className="menu-item">
            <Package />
            <span>Мої замовлення</span>
        </a>

        <a className="menu-item">
            <Heart />
            <span>Обране</span>
        </a>

        <a className="menu-item">
            <MapPin />
            <span>Адреси доставки</span>
        </a>

        <a className="menu-item">
            <Gift />
            <span>Бонуси</span>
        </a>

        <a className="menu-item">
            <Settings />
            <span>Налаштування</span>
        </a>

    </nav>

    <div className="menu-divider"></div>

    <div className="logout">

        <LogOut />

        <span>Вийти</span>

    </div>

</aside>
    );
};

export default Sidebar;