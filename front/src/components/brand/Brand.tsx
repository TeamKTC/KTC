import { useRef } from "react";
import { useGetAllBrandsQuery } from "../../store/services/brandApi"
import BrandCard from "./BrandCard";


const Brand = () => {
    const {data, isLoading, error} = useGetAllBrandsQuery();

    const scrollContainerRef = useRef<HTMLDivElement>(null);

  
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
            left: 300,
            behavior: 'smooth',
        });
        }
    };

    if (isLoading) { 
      return ( 
        <div className="recommended-products">
            <h2>Бренди</h2>
            <p>Завантаження...</p> 
        </div> 
      ); 
    } 
    if (error) { 
      return ( 
        <div className="recommended-products"> 
            <h2>Бренди</h2> 
            <p>Не вдалося завантажити бренди</p> 
        </div> 
      ); 
    }

    return(
        <section className="container-fluid py-3">
            {/* Header */}
            <h2 className="fs-4 fw-bold mb-3">Бренди</h2>

            {/* Brands Container */}
            <div className="d-flex align-items-center gap-3">
                {/* Горизонтальний скролл-список */}
                <div
                ref={scrollContainerRef}
                className="d-flex align-items-center gap-3 overflow-auto py-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none', 
                }}
                >
                {data?.payload?.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                ))}
                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 flex-shrink-0"
                    style={{ width: '36px', height: '36px', borderColor: '#ccc' }}
                    onClick={handleScrollRight}
                    aria-label="Прокрутити вправо"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
                </button>
            </div>
        </section>

    );
}
export default Brand