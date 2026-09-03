import React, { useRef } from 'react';
import { useGetProductsByCategoryIdQuery } from '../../../store/services/productApi';
import type { Product } from '../../../types/types';
import ProductCard from '../../productCard/ProductCard';
import { useTranslation } from 'react-i18next';


interface SimilarProductsProps {
  categoryId: string;
  productId: string; // Додано необов'язковий параметр productId
}

const SimilarProducts = ({ categoryId, productId }: SimilarProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {t } = useTranslation();

  // Виклик запиту прямо в компоненті
  const { data: productsData, isLoading } = useGetProductsByCategoryIdQuery(categoryId);
   const products = productsData?.payload?.filter((p: Product) => p.id !== productId) || [];


  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-4">
      {/* Шапка з кнопками скролу */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold m-0 text-dark">{t("productDetails.similarProducts")}</h2>
        
        <div className="d-flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
            style={{ width: '36px', height: '36px' }}
            aria-label="Попередні товари"
          >
            ‹
          </button>
          
          <button
            onClick={() => handleScroll('right')}
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
            style={{ width: '36px', height: '36px' }}
            aria-label="Наступні товари"
          >
            ›
          </button>
        </div>
      </div>

      {/* Горизонтальна стрічка товарів */}
      <div
        ref={scrollContainerRef}
        className="d-flex gap-3 overflow-x-auto pb-3 hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* ПІДСТАВ СВІЙ МАСИВ І КАРТКУ */}
        {products.slice(0, 6).map((product) => (
          <div key={product.id} style={{ flex: '0 0 auto', width: '220px' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;