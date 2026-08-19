import type { Product } from "../../../types/types";
import { Star } from "lucide-react";
import "./styles.css";
import { useGetCommentsByProductIdQuery } from "../../../store/services/commentApi";
import CommentCard from "../commentCard/CommentCard";

interface ProductCardProps {
  product?: Product | null;
}

const CommentsReviewsSection = ({ product }: ProductCardProps) => {
    const rate = Math.max(0, Math.min(5, product?.rate ?? 0));
    const comments = useGetCommentsByProductIdQuery(product?.id ?? "", { skip: !product?.id });
    
 return (
    <div className="container-fluid py-4">
      <div className="row g-4 align-items-start">
        
        {/* Ліва колонка: Загальна статистика відгуків */}
        <div className="col-12 col-md-3 col-lg-2">
          {/* Заголовок */}
          <h2 className="fw-bold mb-2">
            Відгуки ({product?.amountOfComments ?? 0})
          </h2>

          {/* Загальний рейтинг і зірочки */}
          <div className="d-flex align-items-center gap-1 mb-1">
            <span className="fw-bold fs-5 me-1">
              {product?.rate?.toFixed(1) ?? "0.0"}
            </span>
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
          </div>

          {/* Текст під зірочками */}
          <div className="text-muted small mb-3">
            на основі {product?.amountOfComments ?? 0} відгуків
          </div>

          {/* Гістограма оцінок (5, 4, 3, 2, 1) */}
          <div className="d-flex flex-column gap-1 mb-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="d-flex align-items-center gap-2 small">
                <span className="fw-bold me-1">{rating} ★</span>
                <div className="progress flex-grow-1" style={{ height: '2px' }}>
                  <div 
                    className="progress-bar bg-secondary" 
                    role="progressbar" 
                    style={{ width: '0%' }} /* Відсоток для ширини смужки */
                  />
                </div>
                <span className="text-muted" style={{ minWidth: '24px', textAlign: 'right' }}>
                  {comments.data?.payload?.filter(comment => comment.rateOfProduct === rating).length ?? 0}
                </span>
              </div>
            ))}
          </div>

          {/* Кнопка створення відгуку */}
          <button type="button" className="btn btn-outline-primary w-100 rounded-pill fw-semibold">
            Написати відгук
          </button>
        </div>

        {/* Права колонка: Горизонтальний список карток */}
        <div className="col-12 col-md-9 col-lg-10">
          <div className="d-flex gap-3 overflow-auto pb-3">
            {/* Рендер карток з масиву */}
            {comments.data?.payload?.slice(0, 4).map((comment) => (
              <CommentCard comment={comment} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommentsReviewsSection;