
import "./middleSection.css";
import LaptopGuidePhoto from "./photos/LaptopGuidePhoto";
import { useGetAllCategoriesQuery } from "../../store/services/categoryApi";
import { useNavigate } from "react-router";
import { useGetProductsByCategoryIdQuery } from "../../store/services/productApi";
import React from "react";

const MiddleSection = () => {
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
    <section className="guide-section">
      <div className="guide-container">

        {/* ================= 1. ЛІВА КОЛОНКА: КАТЕГОРІЇ ================= */}
        <div className="categories-sidebar">
          <h2 className="categories-title">Категорії</h2>
          
          <ul className="categories-list">
            {data?.payload?.map((category) => ( <li style={{ cursor: "pointer" }} key={category.id} onClick={() => setSelectedCategoryId(category.id)}>{category.name}</li>))}
          </ul>

          <button className="catalog-link-btn" onClick={handleCatalogClick} style={{ cursor: "pointer" }}>
            Перейти в каталог
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ================= 2. ЦЕНТР: ГОЛОВНИЙ БАНЕР ================= */}
        <div className="main-banner">
          <div className="banner-content">
            <h1>
              Як обрати ідеальний<br />ноутбук у 2026 році
            </h1>
            <p>
              Покроковий гайд для роботи,<br />
              навчання та розваг. Поради<br />
              експертів PixelRoom.
            </p>
            <button className="btn-read-guide">Читати гайд</button>
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
              <h3>Покупка частинами до<br />10 платежів</h3>
              <p>Оформлюйте онлайн<br />без довідок та передплат.</p>
            </div>
            <button className="info-btn">Детальніше</button>
          </div>

          {/* Card 2 */}
          <div className="info-card">
            <div className="info-text">
              <h3>Безкоштовна доставка<br />від 2 000 грн</h3>
              <p>Швидка доставка по Україні<br />та зручні способи оплати</p>
            </div>
            <button className="info-btn">Детальніше</button>
          </div>

          {/* Card 3 */}
          <div className="info-card">
            <div className="info-text">
              <h3>Підтримка 24/7</h3>
              <p>Ми завжди на зв'язку<br />та готові допомогти</p>
            </div>
            <button className="info-btn">Детальніше</button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MiddleSection;