import { useGetProductWithHighestSoldPerMonthQuery } from "../../store/services/productApi";
import ProductCard from "../productCard/ProductCard";
import "../recommended/Recommended.css"


const HitOfSells = () =>{
    const { data, isLoading, error } = useGetProductWithHighestSoldPerMonthQuery(); 

    if (isLoading) { 
        return ( 
        <div className="recommended-products">
            <h2>Рекомендовані товари</h2>
            <p>Завантаження...</p> 
        </div> 
        ); 
    } 
    if (error) { 
        return ( 
        <div className="recommended-products"> 
            <h2>Рекомендовані товари</h2> 
            <p>Не вдалося завантажити товари</p> 
        </div> 
        ); 
    }
    
    return (
            <section className="recommended-products">
    
          {/* Header */}
          <div className="recommended-header">
            <h2>Хіт продажів</h2>
    
            
          </div>
    
          {/* Products */}
          <div className="products-list">
            {data?.payload?.map((product) => ( <ProductCard key={product.id} product={product} /> ))}
          </div>
    
        </section>
    );
}

export default HitOfSells