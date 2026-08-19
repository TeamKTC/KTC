import { Star } from "lucide-react";
import type { Product } from "../../../types/types";
import "./MainComponent.css";
import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetAttributeDefinitionsByProductIdQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetBrandByIdQuery } from "../../../store/services/brandApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";


interface ProductCardProps {
  product?: Product | null;
}

const MainComponent = ({ product }: ProductCardProps) => {
    const rate = Math.max(0, Math.min(5, product?.rate ?? 0));
    const { data: dataProductAttributes } = useGetProductAttributesByProductIdQuery( product?.id ?? "",{ skip: !product?.id });
    const {data : dataAttributeDefinitions} = useGetAttributeDefinitionsByProductIdQuery(product?.id ?? "", { skip: !product?.id });
    const mediaUrl = useGetMediaByProductIdQuery(product?.id ?? "", { skip: !product?.id });
    
const { data: brand } = useGetBrandByIdQuery(
  product?.brandId ?? "", 
  { skip: !product?.brandId }
);
   

  return (
    <div className="product-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="product-gallery">

        {/* Thumbnail column */}
        <div className="product-thumbnails">

          {/* TODO: Тут буде перша картинка товару */}
          <div className="product-thumbnail">
            {/* <img src={...} alt="" /> */}
          </div>

          {/* TODO: Тут буде друга картинка товару */}
          <div className="product-thumbnail">
            {/* <img src={...} alt="" /> */}
          </div>

          {/* TODO: Тут буде третя картинка товару */}
          <div className="product-thumbnail">
            {/* <img src={...} alt="" /> */}
          </div>

          {/* TODO: Тут буде четверта картинка товару */}
          <div className="product-thumbnail">
            {/* <img src={...} alt="" /> */}
          </div>

          {/* TODO: Тут буде п'ята картинка товару */}
          <div className="product-thumbnail">
            {/* <img src={...} alt="" /> */}
          </div>

        </div>

        {/* Main image */}
        <div className="product-main-image">

          {/* TODO: Тут буде головна картинка товару */}
          <img src={mediaUrl.data?.payload?.[0]?.url || "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"} alt={product?.name} />

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="product-info">


        {/* Product title */}
        <h1 className="product-title">
           {brand?.payload?.name ?? "Бренд"} {product?.name}
        </h1>

        {/* Rating + question */}
        <div className="product-rating-row">

          <div className="product-rating">

            
            <span className="stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < rate ? "#FFD600" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </span>

            <span className="reviews">
              ({product?.soldPerMonth})
            </span>

          </div>

          <button className="question-button">
            Поставити запитання
          </button>

        </div>


        {/* Availability */}
        <div className="product-availability">

          <span>
            {product?.quantity && product.quantity > 0 ? "В наявності" : "Немає в наявності"}
          </span>

          <span>
            {/* TODO: delivery information */}
            Доставка 1-3 дні
          </span>

        </div>


        {/* Price block */}
        <div className="price-section">

          <div className="price-left">

            <div className="current-price">
              {product?.price?.toLocaleString()} ₴
            </div>

            <div className="old-price">
              {/* TODO: product.oldPrice */}
            </div>

          </div>


          {/* Discount */}
          <div className="discount">
            {/* TODO: product.discount */}
          </div>


          {/* Bonus */}
          <div className="bonus">
            <strong>
              {/* TODO: кількість бонусів */}
              +___ бонусів
            </strong>

            <span>
              на вашу покупку
            </span>
          </div>


          {/* Quantity */}
          <div className="quantity-block">

            <span className="quantity-label">
              Кількість:
            </span>

            <div className="quantity-selector">

              <button>-</button>

              <span>1</span>

              <button>+</button>

            </div>

          </div>

        </div>


        {/* ================= ACTION BUTTONS ================= */}

        <div className="product-actions">

          {/* TODO: Add to cart */}
          <button className="btn-cart">
            Додати в кошик
          </button>

          {/* TODO: Buy now */}
          <button className="btn-buy">
            Купити в 1 клік
          </button>

          {/* TODO: Add to favorites */}
          <button className="btn-favorite">
            Додати в обране
          </button>

          {/* TODO: Compare */}
          <button className="btn-compare">
            Порівняти
          </button>

        </div>


        {/* ================= CHARACTERISTICS ================= */}

        <div className="product-characteristics">

          

            {dataProductAttributes?.payload?.map((attr) => {
            const attributeDef = dataAttributeDefinitions?.payload?.find(
                (def) => def.id === attr.attributeDefinitionId
            );

                return (
                    <div key={attr.id} className="characteristic">
                    <div className="characteristic-icon">
                        {/* TODO: icon */}
                    </div>

                    <span>
                        {attributeDef?.name ?? "Характеристика"}
                    </span>

                    <strong>
                        {attr.value}
                    </strong>
                    </div>
                );
            })}

          

        </div>


        {/* All characteristics */}
        <button className="all-characteristics">
          Дивитися всі характеристики
        </button>

      </div>

    </div>
  );
};

export default MainComponent;


