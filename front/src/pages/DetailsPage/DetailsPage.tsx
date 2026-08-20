import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/services/productApi";
import { skipToken } from "@reduxjs/toolkit/query";
import MainComponent from "../../components/Details/MainComponent/MainComponent";
import FooterBenefits from "../../components/Profile/FooterBenefits/FooterBenefits";
import DescriptionAndAttributes from "../../components/Details/DescriptionAndAttributes/DescriptionAndAttributes";
import CommentsReviewsSection from "../../components/Details/commentsReviewSection/CommentsReviewSection";
import SimilarProducts from "../../components/Details/similarProducts/SimilarProducts";
import { useEffect } from "react";
    

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(id ?? skipToken); 

  useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);

  // const product: Product | null = data?.payload ?? null;
  const product = data?.payload;

      if (isLoading) { 
        return ( 
          <div className="recommended-products">
              <h2>Ваш товар</h2>
              <p>Завантаження...</p> 
          </div> 
        ); 
      } 
      if (error) { 
        return ( 
          <div className="recommended-products"> 
              <h2>Ваш товар</h2> 
              <p>Не вдалося завантажити товар</p> 
          </div> 
        ); 
      }

  return (
    <>
        <MainComponent key={product?.id} product={product} />
        <FooterBenefits />
        <DescriptionAndAttributes product={product} />
        <CommentsReviewsSection product={product} />
        <SimilarProducts categoryId={product?.categoryId ?? ""} productId={product?.id ?? ""} />
    </>
    );
};

export default DetailsPage;