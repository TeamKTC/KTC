import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Narbar.css";

import Logo from "../logo/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

import Modal from "../Modal/Modal";
import LoginPage from "../../pages/Auth/Login/LoginPage";
import RegisterPage from "../../pages/Auth/Registr/RegisterPage";

const Navbar = () => {
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate("/profile");
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleFavoritesClick = () => {
        if (isAuthenticated) {
            navigate("/favorites");
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleCatalogClick = () => {
        navigate("/cataloge");
    }

    return (
        <>
            {/* Top bar */}
            <div className="top-navbar py-2">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">

                        <div className="d-flex gap-4">

                            <a href="#" className="top-link">
                                Місто
                            </a>

                            <div
                                className="top-link"
                                onClick={() => navigate("/delivery")}
                                style={{ cursor: "pointer" }}
                            >
                                Доставка і оплата
                            </div>

                            <div
                                className="top-link"
                                onClick={() => navigate("/support")}
                                style={{ cursor: "pointer" }}
                            >
                                Підтримка
                            </div>

                            <div
                                className="top-link"
                                onClick={() => navigate("/warranty")}
                                style={{ cursor: "pointer" }}
                            >
                                Гарантія
                            </div>

                            <div
                                className="top-link"
                                onClick={() => navigate("/about")}
                                style={{ cursor: "pointer" }}
                            >
                                Про нас
                            </div>

                            <div
                                className="top-link"
                                onClick={() => navigate("/store")}
                                style={{ cursor: "pointer" }}
                            >
                                Магазин
                            </div>

                        </div>

                        <div className="top-link">
                            <i className="bi bi-telephone me-2"></i>
                            0 800 543 786
                        </div>

                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className="bg-white shadow-sm py-3">
                <div className="container">
                    <div className="d-flex align-items-center">

                        <div className="logo-placeholder me-4">
                            <Logo />
                        </div>

                        <button className="btn btn-primary px-4 d-flex align-items-center me-3"
                            onClick={handleCatalogClick}
                            style={{ cursor: "pointer" }}>
                            <i className="bi bi-list me-2"></i>
                            Каталог товарів
                        </button>

                        <div className="flex-grow-1 me-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Пошук товарів..."
                                />

                                <button className="btn btn-light border">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="d-flex">

                            {/* Профіль */}
                            <div
                                className="icon-item text-decoration-none text-dark"
                                onClick={handleProfileClick}
                                style={{ cursor: "pointer" }}
                            >
                                <i className="bi bi-person"></i>
                                <span>Профіль</span>
                            </div>

                            {/* Кошик */}
                            <div
                                className="icon-item"
                                onClick={() => navigate("/cart")}
                                style={{ cursor: "pointer" }}
                            >
                                <i className="bi bi-cart3 position-relative">
                                    <span className="cart-badge">0</span>
                                </i>
                                <span>Кошик</span>
                            </div>

                            {/* Обране */}
                            <div
                                className="icon-item"
                                onClick={handleFavoritesClick}
                                style={{ cursor: "pointer" }}
                            >
                                <i className="bi bi-heart"></i>
                                <span>Обране</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <Modal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            >
                <LoginPage
                    onClose={() => setIsLoginModalOpen(false)}
                    onOpenRegister={() => {
                        setIsLoginModalOpen(false);
                        setIsRegisterModalOpen(true);
                    }}
                />
            </Modal>

            {/* Register Modal */}
            <Modal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            >
                <RegisterPage
                    onClose={() => setIsRegisterModalOpen(false)}
                    onOpenLogin={() => {
                        setIsRegisterModalOpen(false);
                        setIsLoginModalOpen(true);
                    }}
                />
            </Modal>
        </>
    );
};

export default Navbar;