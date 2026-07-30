import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Narbar.css";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
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

                        <a href="#" className="top-link">
                            Доставка і оплата
                        </a>

                        <a href="#" className="top-link">
                            Підтримка
                        </a>

                        <a href="#" className="top-link">
                            Гарантія
                        </a>

                        <a href="#" className="top-link">
                            Про нас
                        </a>

                        <a href="#" className="top-link">
                            Магазин
                        </a>
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

                        {/* Logo */}
                        <div className="logo-placeholder me-4">
                            <Logo />
                        </div>

                        {/* Catalog */}
                        <button className="btn btn-primary px-4 d-flex align-items-center me-3">
                        <i className="bi bi-list me-2"></i>
                        Каталог товарів
                        </button>

                        {/* Search */}
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

                        {/* Icons */}
                        <div className="d-flex">

                        <Link to="/profile" className="icon-item text-decoration-none text-dark">
                            <i className="bi bi-person"></i>
                            <span>Профіль</span>
                        </Link>

                        <div className="icon-item">
                            <i className="bi bi-cart3 position-relative">
                            <span className="cart-badge">0</span>
                            </i>
                            <span>Кошик</span>
                        </div>

                        <div className="icon-item">
                            <i className="bi bi-heart"></i>
                            <span>Обране</span>
                        </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;