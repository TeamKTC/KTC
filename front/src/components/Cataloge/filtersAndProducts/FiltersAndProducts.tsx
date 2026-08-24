import React, { useState } from 'react';
import ProductCardCat from '../productCard/ProductCardCat';
import type { AttributeDefinition, Product, ProductAttribute } from '../../../types/types';
import { useGetAllAttributeDefinitionsQuery } from '../../../store/services/attributeDefinitionApi';
import { useGetAllProductAttributesQuery } from '../../../store/services/productAttributeApi';
import { useGetAllProductsQuery } from '../../../store/services/productApi';

interface CatalogPageProps {
  products: Product[] | null; // Переданий список товарів (або null, якщо фетчиться)
}

const FiltersAndProducts = ({ products }: CatalogPageProps) => {
  // === СТЕЙТИ ДЛЯ ДАНИХ З БАЗИ ===
  // 1. Отримуємо дані безпосередньо через RTK Query
  const { data: attrResponse, isLoading: isAttrsLoading } = useGetAllAttributeDefinitionsQuery();
  const { data: prodAttrResponse, isLoading: isProdAttrsLoading } = useGetAllProductAttributesQuery();

  // 2. Витягуємо чисті масиви з відповіді API (з підтримкою payload або data)
  const attributes: AttributeDefinition[] = attrResponse?.payload || attrResponse?.payload || [];
  const productAttributes: ProductAttribute[] = prodAttrResponse?.payload || prodAttrResponse?.payload || [];

  // 3. Загальний стан завантаження
  const loading = isAttrsLoading || isProdAttrsLoading;

  // Стейт для пошукових рядків всередині текстових фільтрів
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});

  // Хелпер: Отримання унікальних значень для конкретного атрибута з таблиці ProductAttribute
  const getAttributeValues = (attributeDefinitionId: string) => {
    const values = productAttributes
      .filter((pa) => pa.attributeDefinitionId === attributeDefinitionId)
      .map((pa) => pa.value);

    return Array.from(new Set(values)); // Повертає тільки унікальні значення
  };

  // Хендлер для пошуку всередині списку значень фільтра
  const handleSearchChange = (attrId: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [attrId]: query }));
  };

  if (products === null) {
    products = useGetAllProductsQuery().data?.payload || []; // Якщо products не передані, фетчимо всі товари
  }
  // Стейт для збереження ID відчинених фільтрів (за замовчуванням порожній масив або масив з відкритими ID)
  const [openAttrIds, setOpenAttrIds] = useState<string[]>([]);

  // Перемикач стану відкрити/закрити
  const toggleAccordion = (id: string) => {
    setOpenAttrIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
  <div className="container-fluid py-4">
    <div className="row g-4">
      
      {/* --- БІЧНА ПАНЕЛЬ (ФІЛЬТРИ) --- */}
      <aside className="col-12 col-md-4 col-lg-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
          </div>
        ) : (
          <div className="accordion" id="attributesAccordion">
            {attributes.map((attr) => {
              const uniqueValues = getAttributeValues(attr.id);
              const searchQuery = searchQueries[attr.id]?.toLowerCase() || '';
              
              // Фільтрація значений за пошуковим запитом
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
                        
                        {/* --- ВАРІАНТ 1: ЧИСЛОВИЙ ФІЛЬТР (INTEGER / NUMBER) --- */}
                        {(attr.type === 'integer' || attr.type === 'number') && (
                          <div className="d-flex flex-column gap-3">
                            {/* Поля введення Від / До */}
                            <div className="d-flex align-items-center gap-2">
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="від"
                                onChange={(e) => {
                                  // TODO: Твоя логіка фільтрації "від"
                                }}
                              />
                              <span className="text-muted">—</span>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="до"
                                onChange={(e) => {
                                  // TODO: Твоя логіка фільтрації "до"
                                }}
                              />
                            </div>

                            {/* Перелік конкретних числових значень із чекбоксами */}
                            {uniqueValues.length > 0 && (
                              <div className="d-flex flex-column gap-2 style-scrollbar" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                                {uniqueValues.map((val) => (
                                  <div className="form-check d-flex justify-content-between align-items-center me-2" key={val}>
                                    <div>
                                      <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id={`opt-${attr.id}-${val}`}
                                        onChange={() => {
                                          // TODO: Твоя логіка вибору конкретного числа
                                        }}
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

                        {/* --- ВАРІАНТ 2: ТЕКСТОВИЙ ФІЛЬТР (STRING) --- */}
                        {attr.type === 'string' && (
                          <div className="d-flex flex-column gap-2">
                            {/* Поле пошуку по конкретному атрибуту */}
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

                            {/* Список текстових значень */}
                            <div className="d-flex flex-column gap-2 style-scrollbar" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                              {filteredValues.map((val) => (
                                <div className="form-check d-flex justify-content-between align-items-center me-2" key={val}>
                                  <div>
                                    <input
                                      className="form-check-input me-2"
                                      type="checkbox"
                                      id={`opt-${attr.id}-${val}`}
                                      onChange={() => {
                                        // TODO: Твоя логіка вибору чекбокса
                                      }}
                                    />
                                    <label className="form-check-label small" htmlFor={`opt-${attr.id}-${val}`}>
                                      {val}
                                    </label>
                                  </div>
                                </div>
                              ))}
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

      {/* --- ПРАВА ЧАСТИНА (СІТКА ПРОДУКТІВ) --- */}
      <main className="col-12 col-md-8 col-lg-9">
        {products === null ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Завантаження товарів...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <h5>Товарів не знайдено</h5>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
            {products.map((product) => (
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