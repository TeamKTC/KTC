
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
import LogoutModal from "../../../pages/Auth/LogoutModal/LogoutModal";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const { data, isLoading, error } = useGetMeQuery();
    const {t} = useTranslation();

    const user = data?.payload;

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

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

                        <span>{user.phoneNumber}</span>
                    </div>
                </div>

                <div className="bonus-card-mini">
                    <div className="bonus-text">
                        <small>{t("profile.sidebar.bonusBalanceTitle")}</small>

                        <h4>
                            {user.bonusBalance.toLocaleString("uk-UA")} {t("profile.sidebar.bonusCount")}
                        </h4>

                        <span>{t("profile.sidebar.bonusRate")}</span>
                    </div>

                    <Wallet className="wallet-icon" />
                </div>

                <div className="menu-divider"></div>

                <nav className="menu">

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <User />
                        <span>{t("profile.sidebar.myProfile")}</span>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Package />
                        <span>{t("profile.sidebar.myOrders")}</span>
                    </NavLink>

                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Heart />
                        <span>{t("profile.sidebar.favorites")}</span>
                    </NavLink>

                    <NavLink
                        to="/addresses"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <MapPin />
                        <span>{t("profile.sidebar.deliveryAddresses")}</span>
                    </NavLink>

                    <NavLink
                        to="/bonuses"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Gift />
                        <span>{t("profile.sidebar.bonuses")}</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `menu-item ${isActive ? "active" : ""}`
                        }
                    >
                        <Settings />
                        <span>{t("profile.sidebar.settings")}</span>
                    </NavLink>

                </nav>

                <div className="menu-divider"></div>

                <div
                    className="logout"
                    onClick={() => setShowLogoutModal(true)}
                >
                    <LogOut />
                    <span>{t("profile.sidebar.logout")}</span>
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