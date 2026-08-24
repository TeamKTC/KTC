import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";
import type { Product } from "../../../types/types";
import { useNavigate } from "react-router-dom";


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const mediaUrl = useGetMediaByProductIdQuery(product.id, { skip: !product.id });

    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate(`/details/${product.id}`);
    };

  return (
    <div className="card h-100 shadow-sm position-relative" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <button
        type="button"
        className="btn btn-sm text-secondary position-absolute top-0 end-0 m-2 z-1 border-0 bg-transparent"
        
        aria-label="Add to favorites"
      >
        {/* <i className={`bi ${product.isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i> */}
      </button>

      <div className="p-3 text-center" style={{ height: '200px' }}>
        <img
          src={mediaUrl.data?.payload?.[0]?.url || 'https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png'}
          alt={product.name}
          className="img-fluid h-100 object-fit-contain"
        />
      </div>

      <div className="card-body d-flex flex-column justify-content-between p-3">
        <h6 className="card-title text-dark fs-6 mb-3" style={{ minHeight: '2.5rem', overflow: 'hidden' }}>
          {product.name}
        </h6>

        <div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="fw-bold fs-5 text-dark">
              {product.price.toLocaleString()} грн
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px' }}
              
            >
              <i className="bi bi-cart-plus fs-6"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;