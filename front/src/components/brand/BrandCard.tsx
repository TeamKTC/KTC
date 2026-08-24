import { useNavigate } from "react-router";
import type { Brand } from "../../types/types"
import { useGetAllProductsByBrandIdQuery } from "../../store/services/brandApi";


interface BrandCardProps {
    brand: Brand
}

const BrandCard = ({brand}: BrandCardProps) =>{
  const navigate = useNavigate();
  const { data } = useGetAllProductsByBrandIdQuery(brand?.id, { skip: !brand?.id });

  const handleCatalogClick = () => {
    const filteredProducts = data?.payload ?? [];
    navigate("/cataloge", { state: { products: filteredProducts } });
  };
  
    return (
    <div
      className="card border rounded-3 d-flex align-items-center justify-content-center p-3 flex-shrink-0 shadow-sm-hover"
      style={{
        width: '140px',
        height: '60px',
        borderColor: '#e0e0e0',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={() => handleCatalogClick()}
    >
      <img
        src="https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"
        alt={brand.name}
        className="img-fluid"
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default BrandCard