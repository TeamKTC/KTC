import React, { useState } from "react";
import type { Product } from "../../../types/types";
import { Star } from "lucide-react";
import "./styles.css";
import {
  useGetCommentsByProductIdQuery,
  useCreateCommentMutation,
} from "../../../store/services/commentApi";
import CommentCard from "../commentCard/CommentCard";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

interface ProductCardProps {
  product?: Product | null;
}

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  sub?: string;
}

const CommentsReviewsSection = ({ product }: ProductCardProps) => {
  const rate = Math.max(0, Math.min(5, product?.rate ?? 0));
  const comments = useGetCommentsByProductIdQuery(product?.id ?? "", {
    skip: !product?.id,
  });
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const { t } = useTranslation();

  // Стейт модалки та форми
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [rateOfProduct, setRateOfProduct] = useState(5);
  const [hoverRate, setHoverRate] = useState(0);

  // Функція витягування userId з JWT токена
  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return (
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
        decoded.sub ||
        null
      );
    } catch (error) {
      console.error("Помилка декодування токена:", error);
      return null;
    }
  };

  const handleOpenModal = () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Будь ласка, увійдіть у систему, щоб залишити відгук!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setText("");
    setRateOfProduct(5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Користувач не авторизований або сесія закінчилася!");
      return;
    }

    if (!text.trim()) {
      alert("Будь ласка, напишіть текст відгуку!");
      return;
    }

    try {
      await createComment({
        text: text.trim(),
        rateOfProduct,
        productId: product?.id ?? "",
        userId,
        parentCommentId: null,
      }).unwrap();

      alert("Дякуємо за ваш відгук!");
      handleCloseModal();
    } catch (error) {
      console.error("Помилка при додаванні відгуку:", error);
      alert("Не вдалося відправити відгук.");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4 align-items-start">
        {/* Ліва колонка: Статистика */}
        <div className="col-12 col-md-3 col-lg-2">
          <h2 className="fw-bold mb-2">
            {t("productDetails.reviews.title")} ({product?.amountOfComments ?? 0})
          </h2>

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

          <div className="text-muted small mb-3">
            {t("productDetails.reviews.basedOn", {
              count: product?.amountOfComments ?? 0,
            })}
          </div>

          <div className="d-flex flex-column gap-1 mb-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="d-flex align-items-center gap-2 small">
                <span className="fw-bold me-1">{rating} ★</span>
                <div className="progress flex-grow-1" style={{ height: "2px" }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    style={{ width: "0%" }}
                  />
                </div>
                <span
                  className="text-muted"
                  style={{ minWidth: "24px", textAlign: "right" }}
                >
                  {comments.data?.payload?.filter(
                    (comment) => comment.rateOfProduct === rating
                  ).length ?? 0}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleOpenModal}
            className="btn btn-outline-primary w-100 rounded-pill fw-semibold"
          >
            {t("productDetails.reviews.writeReview")}
          </button>
        </div>

        {/* Права колонка: Відгуки */}
        <div className="col-12 col-md-9 col-lg-10">
          <div className="d-flex gap-3 overflow-auto pb-3">
            {comments.data?.payload?.slice(0, 4).map((comment, index) => (
              <CommentCard key={comment.id || index} comment={comment} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Залишити відгук</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <label className="form-label d-block fw-semibold mb-2">
                      Ваша оцінка:
                    </label>
                    <div className="d-inline-flex gap-1">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                          key={starIndex}
                          size={28}
                          style={{ cursor: "pointer" }}
                          fill={
                            starIndex <= (hoverRate || rateOfProduct)
                              ? "#FFD600"
                              : "none"
                          }
                          stroke={
                            starIndex <= (hoverRate || rateOfProduct)
                              ? "#FFD600"
                              : "#ccc"
                          }
                          onMouseEnter={() => setHoverRate(starIndex)}
                          onMouseLeave={() => setHoverRate(0)}
                          onClick={() => setRateOfProduct(starIndex)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Коментар:
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Поділіться враженнями про товар..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? "Надсилання..." : "Надіслати відгук"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsReviewsSection;