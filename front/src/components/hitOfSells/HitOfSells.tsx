import { useTranslation } from "react-i18next";
import { useGetProductWithHighestSoldPerMonthQuery } from "../../store/services/productApi";
import ProductCard from "../productCard/ProductCard";
import "../recommended/Recommended.css"


const HitOfSells = () =>{
    const { data, isLoading, error } = useGetProductWithHighestSoldPerMonthQuery(); 
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
            <h2>{t("main.sections.bestsellers")}</h2>
    
            
          </div>
    
          {/* Products */}
          <div className="products-list">
            {data?.payload?.map((product) => ( <ProductCard key={product.id} product={product} /> ))}
          </div>
    
        </section>
    );
}

export default HitOfSells