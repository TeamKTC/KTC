import { Trash2 } from "lucide-react";
import { useGetMediaByProductIdQuery } from "../../../../store/services/mediaApi";
import type { Brand } from "../../../../types/types";
import "./BrandsList.css"; // Звичайний імпорт CSS
import { useDeleteBrandMutation, useGetAllBrandsQuery } from "../../../../store/services/brandApi";

const BrandItem = ({ brand }: { brand: Brand }) => {
  const { data: mediaData } = useGetMediaByProductIdQuery(brand.id, {
    skip: !brand.id,
  });

  const imageUrl =
    mediaData?.payload?.[0]?.url ||
    "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png";
 
    const [deleteCreditCard] = useDeleteBrandMutation();
  const handleDeleteButton = (id: string) => {
    deleteCreditCard(id);
  };

  return (
    <div className="productCard">
      <div className="productContent">
        <img
          src={imageUrl}
          alt={brand.name}
          className="productImage"
        />
        <span className="productTitle">
          {brand.name}
        </span>
      </div>
      <button
            onClick={() => handleDeleteButton(brand.id)}
            className="delete-btn"
            aria-label="Видалити картку"
        >
            <Trash2 size={20} />
        </button>
    </div>
  );
};

const BrandsList = () => {
  const { data } = useGetAllBrandsQuery();
  const brands: Brand[] = data?.payload ?? [];

  return (
    <div className="productList">
      {brands.map((brand: Brand) => (
        <BrandItem key={brand.id} brand={brand} />
      ))}
    </div>
  );
};

export default BrandsList;