import ProductCard from "../productCard/ProductCard";
import "./Recommended.css";
import { useGetProductWithHighestRateQuery } from "../../store/services/productApi";
import { useTranslation } from "react-i18next";



const Recommended = () => {
    const { data, isLoading, error } = useGetProductWithHighestRateQuery(); 
    const {t} = useTranslation();
    if (isLoading) { 
      return ( 
        <div className="recommended-products">
            <h2>{t("forAll.recommendedProducts")}</h2>
            <p>{t("forAll.loading")}</p> 
        </div> 
      ); 
    } 
    if (error) { 
      return ( 
        <div className="recommended-products"> 
            <h2>{t("forAll.recommendedProducts")}</h2> 
            <p>{t("forAll.failedToLoadProducts")}</p> 
        </div> 
      ); 
    }

    return (
      <section className="recommended-products">

        {/* Header */}
        <div className="recommended-header">
          <h2>{t("main.sections.recommended")}</h2>

          <button className="view-all-button">
            {t("main.sections.viewAll")}
          </button>
        </div>

        {/* Products */}
        <div className="products-list">
          {data?.payload?.map((product) => ( <ProductCard key={product.id} product={product}  /> ))}
        </div>

    </section>
    );
}

export default Recommended;