
import "./middleSection.css";
import LaptopGuidePhoto from "./photos/LaptopGuidePhoto";
import { useGetAllCategoriesQuery } from "../../store/services/categoryApi";
import { useNavigate } from "react-router";
import { useGetProductsByCategoryIdQuery } from "../../store/services/productApi";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const MiddleSection = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const handleCatalogClick = () => {
        navigate("/cataloge");
    }
  const { data, isLoading, error } = useGetAllCategoriesQuery();
    
 const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
     const { data: productsData } = useGetProductsByCategoryIdQuery(selectedCategoryId ?? "", { skip: !selectedCategoryId });
 
     React.useEffect(() => {
         if (productsData !== undefined && selectedCategoryId !== null) {
             const filteredProducts = productsData?.payload ?? [];
             navigate("/cataloge", { state: { products: filteredProducts } });
         }
     }, [selectedCategoryId, productsData, navigate]);


  if (isLoading) { 
    return ( 
      <div className="recommended-products">
          <h2>{t("forAll.recommendedCategories")}</h2>
          <p>{t("forAll.loading")}</p> 
      </div> 
    ); 
  } 
  if (error) { 
    return ( 
      <div className="recommended-products"> 
          <h2>{t("forAll.recommendedCategories")}</h2> 
          <p>{t("forAll.failedToLoadCategories")}</p> 
      </div> 
    ); 
  }

  return (
    <section className="guide-section">
      <div className="guide-container">

        {/* ================= 1. ЛІВА КОЛОНКА: КАТЕГОРІЇ ================= */}
        <div className="categories-sidebar">
          <h2 className="categories-title">{t("main.sections.categories")}</h2>
          
          <ul className="categories-list">
            {data?.payload?.map((category) => ( <li style={{ cursor: "pointer", color: "var(--text)" }} key={category.id} onClick={() => setSelectedCategoryId(category.id)}>{category.name}</li>))}
          </ul>

          <button className="catalog-link-btn" onClick={handleCatalogClick} style={{ cursor: "pointer" }}>
            {t("main.hero.catalogBtn")}
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ================= 2. ЦЕНТР: ГОЛОВНИЙ БАНЕР ================= */}
        <div className="main-banner">
          <div className="banner-content">
            <h1>
              <Trans i18nKey="main.guideBanner.title" components={{ br: <br /> }} />
            </h1>
            <p>
              <Trans i18nKey="main.guideBanner.subtitle" components={{ br: <br /> }} />
            </p>
            <button className="btn-read-guide">{t("main.guideBanner.readGuideBtn")}</button>
          </div>

          <div className="banner-image">
            <LaptopGuidePhoto />
          </div>
        </div>

        {/* ================= 3. ПРАВА КОЛОНКА: ІНФО-КАРТКИ ================= */}
        <div className="info-cards">

          {/* Card 1 */}
          <div className="info-card">
            <div className="info-text">
              <h3><Trans i18nKey="main.guideBanner.installmentTitle" components={{ br: <br /> }} /></h3>
              <p><Trans i18nKey="main.guideBanner.installmentDesc" components={{ br: <br /> }} /></p>
            </div>
            <button className="info-btn">{t("main.guideBanner.moreDetails")}</button>
          </div>

          {/* Card 2 */}
          <div className="info-card">
            <div className="info-text">
              <h3><Trans i18nKey="main.guideBanner.freeDeliveryTitle" components={{ br: <br /> }} /></h3>
              <p><Trans i18nKey="main.guideBanner.freeDeliveryDesc" components={{ br: <br /> }} /></p>
            </div>
            <button className="info-btn">{t("main.guideBanner.moreDetails")}</button>
          </div>

          {/* Card 3 */}
          <div className="info-card">
            <div className="info-text">
              <h3><Trans i18nKey="main.guideBanner.supportTitle" components={{ br: <br /> }} /></h3>
              <p><Trans i18nKey="main.guideBanner.supportDesc" components={{ br: <br /> }} /></p>
            </div>
            <button className="info-btn">{t("main.guideBanner.moreDetails")}</button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MiddleSection;