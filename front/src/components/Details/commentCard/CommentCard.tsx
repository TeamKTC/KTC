import { useGetMediaByProductIdQuery } from "../../../store/services/mediaApi";
import type { Product } from "../../../types/types";
import type { Comment } from "../../../types/types";



interface CommentCardProps {
  comment: Comment | null;
  product?: Product | null;
}



const CommentCard = ({ comment, product }: CommentCardProps) => {
  const mediaUrl = useGetMediaByProductIdQuery(product?.id ?? "", { skip: !product?.id });
  return (
    <div className="card h-100 border rounded-3 p-3 shadow-sm" style={{ width: '280px', flexShrink: 0 }}>
      {/* Товар та Зображення */}
      <div className="d-flex align-items-center mb-2 gap-2">
        <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
          <img 
            src={mediaUrl.data?.payload?.[0]?.url || "https://ktcmediafoto.blob.core.windows.net/media/bba3a6c4-d6aa-40df-9eea-e93fd141074d.png"}
            alt={product?.name} 
            className="img-fluid object-fit-contain" 
          />
        </div>
        <div>
          <h6 className="mb-0 small fw-bold">
            {product?.name ?? "Назва товару"}
          </h6>
        </div>
      </div>

      {/* Текст відгуку */}
      <div className="flex-grow-1 mb-3 small text-secondary">
        {comment?.text ?? "Текст відгуку"}
      </div>

      {/* Посилання "Читати повністю" */}
      <div>
        <a href="#" className="text-primary text-decoration-none small">
          Читати повністю ...
        </a>
      </div>
    </div>
  );
};

export default CommentCard;