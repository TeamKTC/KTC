import { useNavigate } from "react-router";
import type { Brand } from "../../types/types";
import { useGetAllProductsByBrandIdQuery } from "../../store/services/brandApi";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const navigate = useNavigate();

  const { data } = useGetAllProductsByBrandIdQuery(brand.id, {
    skip: !brand.id,
  });

  const handleCatalogClick = () => {
    const filteredProducts = data?.payload ?? [];

    navigate("/cataloge", {
      state: {
        products: filteredProducts,
      },
    });
  };

  return (
    <div
      className="card border rounded-3 d-flex align-items-center justify-content-center p-3 flex-shrink-0"
      style={{
        width: "140px",
        height: "60px",
        borderColor: "#e0e0e0",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={handleCatalogClick}
    >
      {brand.logoUrl ? (
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="img-fluid"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <span className="fw-semibold text-muted">
          {brand.name}
        </span>
      )}
    </div>
  );
};

export default BrandCard;