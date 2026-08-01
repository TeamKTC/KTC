import ProductCard from "../productCard/ProductCard";
import "./Recommended.css";
import { useGetProductWithHighestRateQuery } from "../../store/services/productApi";



const Recommended = () => {
    const { data, isLoading, error } = useGetProductWithHighestRateQuery(); 
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
          <h2>Рекомендовані товари</h2>

          <button className="view-all-button">
            Переглянути всі
          </button>
        </div>

        {/* Products */}
        <div className="products-list">
          {data?.payload?.map((product) => ( <ProductCard key={product.id} product={product} /> ))}
        </div>

    </section>
    );
}

export default Recommended;