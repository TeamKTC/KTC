import type { Product } from "../../../types/types";
import "./DescriptionAndAttributes.css";
import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetAttributeDefinitionsByProductIdQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetBrandByIdQuery } from "../../../store/services/brandApi";
import { useProductTranslation } from "../../../translating/productTranslation";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product?: Product | null;
}


export const AttributeItem = ({ attr, definitions }: { attr: any; definitions: any }) => {
  const attributeDef = definitions?.find((def: any) => def.id === attr.attributeDefinitionId);
  const translatedName = useProductTranslation(attributeDef?.name ?? "Характеристика");

  return (
    <div key={attr.id} className="characteristic">
      <span className="spec-label">{translatedName}</span>
      <strong className="spec-value">{attr.value}</strong>
    </div>
  );
};


const DescriptionAndAttributes = ({ product }: ProductCardProps) => {
  const { data: dataProductAttributes } = useGetProductAttributesByProductIdQuery(
    product?.id ?? "",
    { skip: !product?.id }
  );
  const { data: dataAttributeDefinitions } = useGetAttributeDefinitionsByProductIdQuery(
    product?.id ?? "",
    { skip: !product?.id }
  );
  const { data: brand } = useGetBrandByIdQuery(
    product?.brandId ?? "",
    { skip: !product?.brandId }
  );
  const {t} = useTranslation();
  return (
    <div className="product-details-container">
      {/* Ліва колонка: Опис */}
      <div className="product-description-section">
        <h2>{t("productDetails.tabs.description")}</h2>
        <div className="description-content">
          <p>{useProductTranslation(product?.description ?? "Опис товару відсутній")}</p>
        </div>
      </div>

      {/* Права колонка: Список характеристик */}
      <div className="product-info-section">
        <h2>{t("productDetails.tabs.specifications")}</h2>
        <div className="specs-table">
          
          {/* Бренд */}
          <div className="characteristic">
            <span className="spec-label">{t("forAll.brand")}</span>
            <strong className="spec-value">
              {brand?.payload?.name ?? "Бренд не знайдено"}
            </strong>
          </div>

          {/* Інші характеристики з API */}
          {dataProductAttributes?.payload?.map((attr) => {
            const attributeDef = dataAttributeDefinitions?.payload?.find(
              (def) => def.id === attr.attributeDefinitionId
            );

            return (
              <AttributeItem 
                key={attr.id} 
                attr={attr} 
                definitions={dataAttributeDefinitions?.payload} 
              />
            );
          })}
        </div>

        <button className="show-more-link" onClick={() => {/* TODO: Подія кнопки */}}>
          {t("productDetails.viewAllSpecs")}
        </button>
      </div>
    </div>
  );
};

export default DescriptionAndAttributes;