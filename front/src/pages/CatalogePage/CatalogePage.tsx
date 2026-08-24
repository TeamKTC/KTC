import { useLocation } from "react-router-dom";
import BrandForCataloge from "../../components/brand/BrandForCataloge";
import FiltersAndProducts from "../../components/Cataloge/filtersAndProducts/FiltersAndProducts";



const CatalogePage = () => {
    const location = useLocation();
  
  const passedProducts = location.state?.products ?? null;
    return (
        <>
        <h1>CatalogePage</h1>
        <BrandForCataloge />
        <FiltersAndProducts products={passedProducts} />
        </>
    );
};

export default CatalogePage;