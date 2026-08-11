import type { Product } from "../../../types/types";
import "./DescriptionAndAttributes.css";
import { useGetProductAttributesByProductIdQuery } from "../../../store/services/productAttributeApi";
import { useGetAttributeDefinitionsByProductIdQuery } from "../../../store/services/attributeDefinitionApi";
import { useGetBrandByIdQuery } from "../../../store/services/brandApi";

interface ProductCardProps {
  product?: Product | null;
}

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

  return (
    <div className="product-details-container">
      {/* Ліва колонка: Опис */}
      <div className="product-description-section">
        <h2>Опис</h2>
        <div className="description-content">
          <p>{product?.description ?? "Опис товару відсутній"}</p>
        </div>
      </div>

      {/* Права колонка: Список характеристик */}
      <div className="product-info-section">
        <h2>Характеристики</h2>
        <div className="specs-table">
          
          {/* Бренд */}
          <div className="characteristic">
            <span className="spec-label">Бренд</span>
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
              <div key={attr.id} className="characteristic">
                <span className="spec-label">
                  {attributeDef?.name ?? "Характеристика"}
                </span>
                <strong className="spec-value">{attr.value}</strong>
              </div>
            );
          })}
        </div>

        <button className="show-more-link" onClick={() => {/* TODO: Подія кнопки */}}>
          Дивитися всі характеристики
        </button>
      </div>
    </div>
  );
};

export default DescriptionAndAttributes;