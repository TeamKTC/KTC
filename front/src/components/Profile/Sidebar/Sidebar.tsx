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

import { useGetMeQuery } from "../../../store/services/userApi";

const Sidebar = () => {
    const { data, isLoading, error } = useGetMeQuery();

    const user = data?.payload;

    if (isLoading) {
        return (
            <aside className="sidebar">
                <div className="user-card">
                    <div className="avatar">
                        ...
                    </div>

                    <div className="user-info">
                        <h3>Завантаження...</h3>
                        <p>...</p>
                        <span>...</span>
                    </div>
                </div>
            </aside>
        );
    }

    if (error || !user) {
        return (
            <aside className="sidebar">
                <div className="user-card">
                    <div className="avatar">
                        ?
                    </div>

                    <div className="user-info">
                        <h3>Не вдалося завантажити</h3>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="sidebar">

            <div className="user-card">

                <div className="avatar">
                    {user.firstName.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">
                    <h3>
                        {user.firstName} {user.lastName}
                    </h3>

                    <p>{user.email}</p>

                    <span>{user.phoneNumber}</span>
                </div>

            </div>

            <div className="bonus-card-mini">

                <div className="bonus-text">
                    <small>Бонусний баланс</small>
                    <h4>1 250 бонусів</h4>
                    <span>1 бонус = 1 грн</span>
                </div>

                <Wallet className="wallet-icon" />

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