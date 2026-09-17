import { Trash2 } from "lucide-react";
import type { Category } from "../../../../types/types";
import "./CategoriesList.css"; // Звичайний імпорт CSS
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "../../../../store/services/categoryApi";

const CategoryItem = ({ category }: { category: Category }) => {
    const [deleteCreditCard] = useDeleteCategoryMutation();
  const handleDeleteButton = (id: string) => {
    deleteCreditCard(id);
  };

  return (
    <div className="productCard">
      <div className="productContent">
        <span className="productTitle">
          {category.name}
        </span>
      </div>
      <button
            onClick={() => handleDeleteButton(category.id)}
            className="delete-btn"
            aria-label="Видалити картку"
        >
            <Trash2 size={20} />
        </button>
    </div>
  );
};

const CategoriesList = () => {
  const { data } = useGetAllCategoriesQuery();
  const categories: Category[] = data?.payload ?? [];

  return (
    <div className="productList">
      {categories.map((category: Category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesList;