
import { useState } from "react";
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

import { NavLink, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../../store/services/userApi";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import LogoutModal from "../../../pages/Auth/LogoutModal/LogoutModal";

const Sidebar = () => {
    const { data, isLoading, error } = useGetMeQuery();

    const user = data?.payload;

    const {t} = useTranslation();

    const navigate = useNavigate();
    const handleSettingsClick = () =>{
        navigate("/settings")
    }
    const handleProfileClick =() =>{
        navigate("/profile")
    }
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const handleLogout = () => {
        localStorage.clear();
        setShowLogoutModal(false);
        window.location.href = "/";
    };  

    if (isLoading) {
        return (
            <aside className="sidebar">
                <div className="user-card">
                    <div className="avatar">...</div>

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
                    <div className="avatar">?</div>

                    <div className="user-info">
                        <h3>Не вдалося завантажити</h3>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <>
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

                <div className="bonus-text">
                    <small>{t("profile.sidebar.bonusBalanceTitle")}</small>
                    <h4>1 250 {t("profile.sidebar.bonusCount")}</h4>
                    <span>{t("profile.sidebar.bonusRate")}</span>
                </div>

                <Wallet className="wallet-icon" />

            </div>

            <div className="menu-divider"></div>

            <nav className="menu">

                <a className="menu-item active" onClick={handleProfileClick}>
                    <User />
                    <span>{t("profile.sidebar.myProfile")}</span>
                </a>

                <a className="menu-item">
                    <Package />
                    <span>{t("profile.sidebar.myOrders")}</span>
                </a>

                <a className="menu-item">
                    <Heart />
                    <span>{t("profile.sidebar.favorites")}</span>
                </a>

                <a className="menu-item">
                    <MapPin />
                    <span>{t("profile.sidebar.deliveryAddresses")}</span>
                </a>

                <a className="menu-item">
                    <Gift />
                    <span>{t("profile.sidebar.bonuses")}</span>
                </a>

                <a className="menu-item" onClick={handleSettingsClick} >
                    <Settings />
                    <span>{t("profile.sidebar.settings")}</span>
                </a>

            </nav>

            <div className="menu-divider"></div>

            <div className="logout">
                        <span>{user.phoneNumber}</span>
                    </div>
                </div>

                <div className="bonus-card-mini">
                    <div className="bonus-text">
                        <small>Бонусний баланс</small>

                        <h4>
                            {user.bonusBalance.toLocaleString("uk-UA")} бонусів
                        </h4>

                        <span>1 бонус = 1 грн</span>
                    </div>

                    <Wallet className="wallet-icon" />
                </div>

                <span>{t("profile.sidebar.logout")}</span>
                <div className="menu-divider"></div>

                <nav className="menu">

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <User />
                        <span>Мій профіль</span>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Package />
                        <span>Мої замовлення</span>
                    </NavLink>

                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Heart />
                        <span>Обране</span>
                    </NavLink>

                    <NavLink
                        to="/addresses"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <MapPin />
                        <span>Адреси доставки</span>
                    </NavLink>

                    <NavLink
                        to="/bonuses"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Gift />
                        <span>Бонуси</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Settings />
                        <span>Налаштування</span>
                    </NavLink>

                </nav>

                <div className="menu-divider"></div>

                <div
                    className="logout"
                    onClick={() => setShowLogoutModal(true)}
                >
                    <LogOut />
                    <span>Вийти</span>
                </div>

            </aside>

            {showLogoutModal && (
                <LogoutModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                />
            )}
        </>
    );
};

export default Sidebar;

