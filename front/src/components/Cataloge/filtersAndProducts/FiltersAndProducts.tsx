import  { useState } from 'react';
import ProductCardCat from '../productCard/ProductCardCat';
import type { AttributeDefinition, Product, ProductAttribute } from '../../../types/types';
import { useGetAllAttributeDefinitionsQuery } from '../../../store/services/attributeDefinitionApi';
import { useGetAllProductAttributesQuery, useGetProductAttributesByRangeOfValueQuery, useGetProductAttributesByStringValueQuery } from '../../../store/services/productAttributeApi';
import { useGetAllProductsQuery } from '../../../store/services/productApi';

interface CatalogPageProps {
  products: Product[] | null; // Початковий/зовнішній список товарів
}

const FiltersAndProducts = ({ products: initialProducts }: CatalogPageProps) => {
  
  // === Виклик хуків на верхньому рівні (без умов і if) ===
  const { data: allProductsResponse, isLoading: isAllProductsLoading } = useGetAllProductsQuery(undefined, {
    skip: initialProducts !== null, // Не робимо запит, якщо товари вже передані ззовні
  });

  // === Стейт для вибраного текстового фільтра ===
  const [selectedStringFilter, setSelectedStringFilter] = useState<{
    attributeId: string;
    value: string;
  } | null>(null);

  const [selectedRangeFilter, setSelectedRangeFilter] = useState<{
    attributeId: string;
    min: number;
    max: number;
  } | null>(null);

  // === Виклик RTK Query для фільтрації на верхньому рівні ===
  const { data: filteredProductsResponse, isLoading: isFilteredLoading } = useGetProductAttributesByStringValueQuery(
    {
      attributeDefinitionId: selectedStringFilter?.attributeId || '',
      value: selectedStringFilter?.value || '',
    },
    {
      skip: !selectedStringFilter, // Виконуємо запит лише коли є активний фільтр
    }
  );

  const { data: filteredRangeProductsResponse, isLoading: isFilteredRangeLoading } = useGetProductAttributesByRangeOfValueQuery(
    {
      attributeDefinitionId: selectedRangeFilter?.attributeId || '',
      min: selectedRangeFilter?.min || 0,
      max: selectedRangeFilter?.max || 0,
    },
    {
      skip: !selectedRangeFilter,
    }
  );

  // === СТЕЙТИ ДЛЯ ДАНИХ З БАЗИ ===
  const { data: attrResponse, isLoading: isAttrsLoading } = useGetAllAttributeDefinitionsQuery();
  const { data: prodAttrResponse, isLoading: isProdAttrsLoading } = useGetAllProductAttributesQuery();

  const attributes: AttributeDefinition[] = attrResponse?.payload || [];
  const productAttributes: ProductAttribute[] = prodAttrResponse?.payload || [];

  const loading = isAttrsLoading || isProdAttrsLoading || isAllProductsLoading || isFilteredLoading || isFilteredRangeLoading;

  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [openAttrIds, setOpenAttrIds] = useState<string[]>([]);

  // === Визначення підсумкового списку продуктів для рендеру ===
  let displayProducts: Product[] | null = null;
  if (selectedStringFilter) {
    displayProducts = filteredProductsResponse?.payload || [];
  }
  else if (selectedRangeFilter) {
    displayProducts = filteredRangeProductsResponse?.payload || [];
  }
  else {
    displayProducts = initialProducts ?? (allProductsResponse?.payload || []);
  }

  const getAttributeValues = (attributeDefinitionId: string) => {
    const values = productAttributes
      .filter((pa) => pa.attributeDefinitionId === attributeDefinitionId)
      .map((pa) => pa.value);

    return Array.from(new Set(values));
  };

  const handleSearchChange = (attrId: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [attrId]: query }));
  };

  const toggleAccordion = (id: string) => {
    setOpenAttrIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // === Оновлений хендлер фільтрації (зміна стейту замість прямого виклику хука) ===
  const handleStringFilterChange = (attributeId: string, value: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedStringFilter({ attributeId, value });
    } else {
      // Якщо галочку знято — скидаємо фільтр
      setSelectedStringFilter(null);
    }
  };

 // Зберігає тимчасові значення { [attrId]: { min: string, max: string } }
const [rangeInputs, setRangeInputs] = useState<Record<string, { min: string; max: string }>>({});

// Хендлер зміни полів
const handleRangeInputChange = (attrId: string, field: 'min' | 'max', value: string) => {
  setRangeInputs((prev) => ({
    ...prev,
    [attrId]: {
      ...prev[attrId],
      [field]: value,
    },
  }));
};

// Застосування фільтра
const handleApplyRange = (attrId: string) => {
  const minVal = Number(rangeInputs[attrId]?.min);
  const maxVal = Number(rangeInputs[attrId]?.max);

  if (!isNaN(minVal) && !isNaN(maxVal) && (minVal > 0 || maxVal > 0)) {
    // Встановлюємо активний range-фільтр (і скидаємо string-фільтр, якщо треба)

    setSelectedRangeFilter({
      attributeId: attrId,
      min: minVal,
      max: maxVal,
    });
  }
  else{
    setSelectedRangeFilter(null); // Якщо обидва поля порожні або некоректні, скидаємо фільтр
  }
};

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        
        {/* --- БІЧНА ПАНЕЛЬ (ФІЛЬТРИ) --- */}
        <aside className="col-12 col-md-4 col-lg-3">
          {loading && !attributes.length ? (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            </div>
          ) : (
            <div className="accordion" id="attributesAccordion">
              {attributes.map((attr) => {
                const uniqueValues = getAttributeValues(attr.id);
                const searchQuery = searchQueries[attr.id]?.toLowerCase() || '';
                
                const filteredValues = uniqueValues.filter((val) =>
                  val.toLowerCase().includes(searchQuery)
                );

                const isOpen = openAttrIds.includes(attr.id);

                return (
                  <div className="accordion-item border-0 border-bottom" key={attr.id}>
                    <h2 className="accordion-header" id={`heading-${attr.id}`}>
                      <button
                        className={`accordion-button px-2 py-3 bg-transparent shadow-none fw-semibold fs-6 ${
                          !isOpen ? 'collapsed' : ''
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(attr.id)}
                        aria-expanded={isOpen}
                      >
                        {attr.name}
                      </button>
                    </h2>

                    {isOpen && (
                      <div
                        id={`collapse-${attr.id}`}
                        className="accordion-collapse collapse show"
                        aria-labelledby={`heading-${attr.id}`}
                      >
                        <div className="accordion-body px-2 py-2">
                          
                          {/* --- ЧИСЛОВИЙ ФІЛЬТР --- */}
                          {(attr.type === 'integer' || attr.type === 'number') && (
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-center gap-2">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  placeholder="від"
                                  value={rangeInputs[attr.id]?.min || ''}
                                  onChange={(e) => handleRangeInputChange(attr.id, 'min', e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleApplyRange(attr.id)}
                                />
                                <span className="text-muted">—</span>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  placeholder="до"
                                  value={rangeInputs[attr.id]?.max || ''}
                                  onChange={(e) => handleRangeInputChange(attr.id, 'max', e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleApplyRange(attr.id)}
                                />
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  type="button"
                                  onClick={() => handleApplyRange(attr.id)}
                                >
                                  ОК
                                </button>
                              </div>

                              {uniqueValues.length > 0 && (
                                <div className="d-flex flex-column gap-2 style-scrollbar" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                                  {uniqueValues.map((val) => (
                                    <div className="form-check d-flex justify-content-between align-items-center me-2" key={val}>
                                      <div>
                                        <input
                                          className="form-check-input me-2"
                                          type="checkbox"
                                          id={`opt-${attr.id}-${val}`}
                                          onChange={(e) => handleStringFilterChange(attr.id, val, e.target.checked)}
                                        />
                                        <label className="form-check-label small" htmlFor={`opt-${attr.id}-${val}`}>
                                          {val}
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* --- ТЕКСТОВИЙ ФІЛЬТР --- */}
                          {attr.type === 'string' && (
                            <div className="d-flex flex-column gap-2">
                              <div className="position-relative mb-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm pe-4 rounded-3"
                                  placeholder="Пошук"
                                  value={searchQueries[attr.id] || ''}
                                  onChange={(e) => handleSearchChange(attr.id, e.target.value)}
                                />
                                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-2 text-muted small"></i>
                              </div>

                              <div className="d-flex flex-column gap-2 style-scrollbar" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                                {filteredValues.map((val) => {
                                  // === ЗМІНА: 6. Перевірка, чи вибраний цей чекбокс ===
                                  const isChecked = selectedStringFilter?.attributeId === attr.id && selectedStringFilter?.value === val;

                                  return (
                                    <div className="form-check d-flex justify-content-between align-items-center me-2" key={val}>
                                      <div>
                                        <input
                                          className="form-check-input me-2"
                                          type="checkbox"
                                          id={`opt-${attr.id}-${val}`}
                                          checked={isChecked}
                                          onChange={(e) => handleStringFilterChange(attr.id, val, e.target.checked)}
                                        />
                                        <label className="form-check-label small" htmlFor={`opt-${attr.id}-${val}`}>
                                          {val}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* --- СІТКА ПРОДУКТІВ --- */}
        <main className="col-12 col-md-8 col-lg-9">
          {/* === ЗМІНА: 7. Використання displayProducts замість модифікованого пропсу === */}
          {displayProducts === null || loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Завантаження товарів...</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>Товарів не знайдено</h5>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {displayProducts.map((product) => (
                <div className="col" key={product.id}>
                  <ProductCardCat product={product} />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default FiltersAndProducts;