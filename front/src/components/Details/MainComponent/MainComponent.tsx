import { Star } from "lucide-react";
import type { Product } from "../../../types/types";
import "./MainComponent.css";
import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetAttributeDefinitionsByProductIdQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetBrandByIdQuery } from "../../../store/services/brandApi";
import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";
import { useTranslation } from "react-i18next";
import { useProductTranslation } from "../../../translating/productTranslation";


interface ProductCardProps {
  product?: Product | null;
}


export const AttributeItem = ({ attr, definitions }: { attr: any; definitions: any }) => {
  const attributeDef = definitions?.find((def: any) => def.id === attr.attributeDefinitionId);
  const translatedName = useProductTranslation(attributeDef?.name ?? "Характеристика");

  return (
    <div className="characteristic">
      <div className="characteristic-icon">
        {/* TODO: icon */}
      </div>

      <span>
        {translatedName}
      </span>

      <strong>
        {attr.value}
      </strong>
    </div>
  );
};

const MainComponent = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
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
           {brand?.payload?.name ?? t("forAll.brand")} {product?.name}
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
            {t("productDetails.askQuestion")}
          </button>

        </div>


        {/* Availability */}
        <div className="product-availability">

          <span>
            {product?.quantity && product.quantity > 0 ? t("productDetails.inStock") : t("productDetails.outOfStock")}
          </span>

          <span>
            {/* TODO: delivery information */}
            {t("productDetails.deliveryTime")}
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
              +___ {t("productDetails.bonus")}
            </strong>

            <span>
              {t("productDetails.bonusesForPurchase")}
            </span>
          </div>


          {/* Quantity */}
          <div className="quantity-block">

            <span className="quantity-label">
              {t("productDetails.quantity")}
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
            {t("productDetails.addToCart")}
          </button>

          {/* TODO: Buy now */}
          <button className="btn-buy">
            {t("productDetails.buyOneClick")}
          </button>

          {/* TODO: Add to favorites */}
          <button className="btn-favorite">
            {t("productDetails.addToFavorites")}
          </button>

          {/* TODO: Compare */}
          <button className="btn-compare">
            {t("productDetails.compare")}
          </button>

        </div>


        {/* ================= CHARACTERISTICS ================= */}

        <div className="product-characteristics">

          

            {dataProductAttributes?.payload?.map((attr: any) => (
              <AttributeItem
                key={attr.id}
                attr={attr}
                definitions={dataAttributeDefinitions?.payload}
              />
            ))}
          

        </div>


        {/* All characteristics */}
        <button className="all-characteristics">
          {t("productDetails.viewAllSpecs")}
        </button>

      </div>

    </div>
  );
};

export default MainComponent;


