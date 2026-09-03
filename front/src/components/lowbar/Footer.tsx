import "./Footer.css";
import { useGetAllCategoriesQuery } from "../../store/services/categoryApi";
import WhiteVersionOfLogo from "../logo/WhiteVersionOfLogo";
import { useGetProductsByCategoryIdQuery } from "../../store/services/productApi";
import { useNavigate } from "react-router";
import React from "react";
import { Trans, useTranslation } from "react-i18next";


const Footer = () => {
    const {t} = useTranslation();
    const { data, isLoading, error } = useGetAllCategoriesQuery();
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
    let { data: productsData } = useGetProductsByCategoryIdQuery(selectedCategoryId ?? "", { skip: !selectedCategoryId });

    React.useEffect(() => {
        if (productsData !== undefined && selectedCategoryId !== null) {
            const filteredProducts = productsData?.payload ?? [];
            navigate("/cataloge", { state: { products: filteredProducts } });
            setSelectedCategoryId(null); // Reset selectedCategoryId after navigation
            productsData = undefined; // Reset productsData after navigation
        }
    }, [selectedCategoryId, productsData, navigate]);

    if (isLoading) { 
      return ( 
        <div className="recommended-products">
            <h2>Рекомендовані категорії</h2>
            <p>{t("forAll.loading")}</p> 
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

                                <h4>{t("footer.subscribe.title")}</h4>

                                <p>{t("footer.subscribe.subtitle")}</p>

                                <input
                                    type="email"
                                    className="form-control my-3"
                                    placeholder="Email"
                                />

                                <button className="btn btn-primary w-100 mb-4">
                                    {t("footer.subscribe.submitBtn")}
                                </button>

                                {/* Logo */}
                                <div className="footer-logo">
                                    <WhiteVersionOfLogo />
                                </div>

                            </div>

                        </div>

                        {/* Catalog */}
                        <div className="col-lg-2 col-md-6 mb-4">

                            <h5>{t("footer.catalogTitle")}</h5>

                            <ul className="footer-list">
                                {data?.payload?.map((category) => ( <li key={category.id} onClick={() => setSelectedCategoryId(category.id)}>{category.name}</li>))}
                            </ul>

                        </div>

                        {/* Shop */}
                        <div className="col-lg-3 col-md-6 mb-4">

                            <h5>{t("footer.onlineStore.title")}</h5>

                            <ul className="footer-list">
                                <li>{t("footer.onlineStore.aboutUs")}</li>
                                <li>{t("footer.onlineStore.promotions")}</li>
                                <li>{t("footer.onlineStore.warranty")}</li>
                                <li>{t("footer.onlineStore.delivery")}</li>
                                <li>{t("footer.onlineStore.payment")}</li>
                                <li>{t("footer.onlineStore.contacts")}</li>
                                <li>{t("footer.onlineStore.store")}</li>
                                <li>{t("footer.onlineStore.privacyPolicy")}</li>
                                <li>Black Friday</li>
                            </ul>

                        </div>

                        {/* Service */}
                        <div className="col-lg-2 col-md-6 mb-4">

                            <h5>{t("footer.service.title")}</h5>

                            <ul className="footer-list">
                                <li>{t("footer.service.warrantyService")}</li>
                                <li>{t("footer.service.appleAuthorization")}</li>
                            </ul>

                            <h5 className="mt-5">{t("footer.callCenter.title")}</h5>

                            <p className="small text-muted">
                               <Trans i18nKey="footer.callCenter.schedule" components={{ br: <br /> }} />
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
                            {t("footer.callCenter.y")}
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