import "./Footer.css";
import Logo from "../logo/Logo";
import { useGetAllCategoriesQuery } from "../../store/services/categoryApi";
import WhiteVersionOfLogo from "../logo/WhiteVersionOfLogo";


const Footer = () => {
    const { data, isLoading, error } = useGetAllCategoriesQuery();

    if (isLoading) { 
      return ( 
        <div className="recommended-products">
            <h2>Рекомендовані категорії</h2>
            <p>Завантаження...</p> 
        </div> 
      ); 
    } 
    if (error) { 
      return ( 
        <div className="recommended-products"> 
            <h2>Рекомендовані категорії</h2> 
            <p>Не вдалося завантажити категорії</p> 
        </div> 
      ); 
    }

    return (
        <>
            <footer className="footer mt-5">

                <div className="container py-5">
                    <div className="row">

                        {/* Subscribe */}
                        <div className="col-lg-3 mb-4">

                            <div className="subscribe-box">

                                <h4>Підписуйся на знижки!</h4>

                                <p>Не турбуйся, ми не спамимо</p>

                                <input
                                    type="email"
                                    className="form-control my-3"
                                    placeholder="Email"
                                />

                                <button className="btn btn-primary w-100 mb-4">
                                    Відправити
                                </button>

                                {/* Logo */}
                                <div className="footer-logo">
                                    <WhiteVersionOfLogo />
                                </div>

                            </div>

                        </div>

                        {/* Catalog */}
                        <div className="col-lg-2 col-md-6 mb-4">

                            <h5>Каталог товарів</h5>

                            <ul className="footer-list">
                                {data?.payload?.map((category) => ( <li>{category.name}</li>))}
                            </ul>

                        </div>

                        {/* Shop */}
                        <div className="col-lg-3 col-md-6 mb-4">

                            <h5>Інтернет-магазин</h5>

                            <ul className="footer-list">
                                <li>Про нас</li>
                                <li>Акції</li>
                                <li>Гарантії</li>
                                <li>Доставка</li>
                                <li>Оплата</li>
                                <li>Контакти</li>
                                <li>Магазин</li>
                                <li>Політика конфіденційності</li>
                                <li>Black Friday</li>
                            </ul>

                        </div>

                        {/* Service */}
                        <div className="col-lg-2 col-md-6 mb-4">

                            <h5>Сервіс</h5>

                            <ul className="footer-list">
                                <li>Гарантійне обслуговування</li>
                                <li>Авторизація Apple</li>
                            </ul>

                            <h5 className="mt-5">Call-центр</h5>

                            <p className="small text-muted">
                                Call-центр працює по буднях з 9:00 до 20:00
                                <br />
                                та у вихідні з 9:00 до 20:00
                            </p>

                        </div>

                        {/* Contacts */}
                        <div className="col-lg-2 col-md-6">

                            <div className="contact-item">
                                <i className="bi bi-telephone"></i>
                                <span>0 800 210-484</span>
                            </div>

                            <div className="contact-item">
                                <i className="bi bi-envelope"></i>
                                <span>ishop@PixelRoom</span>
                            </div>

                            <div className="contact-item">
                                <i className="bi bi-chat"></i>
                                <span>Apple Business Chat</span>
                            </div>

                            <div className="socials mt-4">

                                <a href="#">
                                    <i className="bi bi-facebook"></i>
                                </a>

                                <a href="#">
                                    <i className="bi bi-instagram"></i>
                                </a>

                                <a href="#">
                                    <i className="bi bi-twitter"></i>
                                </a>

                                <a href="#">
                                    <i className="bi bi-youtube"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="footer-bottom">

                        <span>
                            Мережа магазинів PixelRoom™ 2002-2026. Всі права захищені.
                        </span>

                        <div className="payments">
                            <i className="bi bi-google fs-3"></i>
                            <span className="mx-2 fw-bold">VISA</span>
                            <i className="bi bi-apple fs-3"></i>
                            <span className="ms-2 fw-bold text-danger">MasterCard</span>
                        </div>

                    </div>

                </div>

            </footer>
        </>
    );
}   

export default Footer;