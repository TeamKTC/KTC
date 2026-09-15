import { Trash2 } from "lucide-react";
import { useGetMediaByProductIdQuery } from "../../../../store/services/mediaApi";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../../store/services/productApi";
import type { Product } from "../../../../types/types";
import "./ProductsList.css"; // Звичайний імпорт CSS

const ProductItem = ({ product }: { product: Product }) => {
  const { data: mediaData } = useGetMediaByProductIdQuery(product.id, {
    skip: !product.id,
  });

  const imageUrl =
    mediaData?.payload?.[0]?.url ||
    "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png";
 
    const [deleteCreditCard] = useDeleteProductMutation();
  const handleDeleteButton = (id: string) => {
    deleteCreditCard(id);
  };

  return (
    <div className="productCard">
      <div className="productContent">
        <img
          src={imageUrl}
          alt={product.name}
          className="productImage"
        />
        <span className="productTitle">
          {product.name}
        </span>
      </div>
      <button
            onClick={() => handleDeleteButton(product.id)}
            className="delete-btn"
            aria-label="Видалити картку"
        >
            <Trash2 size={20} />
        </button>
    </div>
  );
};

const ProductList = () => {
  const { data } = useGetAllProductsQuery();
  const products: Product[] = data?.payload ?? [];

  return (
    <div className="productList">
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;