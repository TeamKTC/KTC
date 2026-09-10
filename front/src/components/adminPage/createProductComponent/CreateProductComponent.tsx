import React, { useState } from "react";
import { useCreateProductMutation } from "../../../store/services/productApi"; 
import type { CreateProductDto } from "../../../types/types";
import { useGetAllCategoriesQuery } from "../../../store/services/categoryApi";
import { useGetAllBrandsQuery } from "../../../store/services/brandApi";
import "./CreateProductComponent.css"; // Імпортуємо стилі

const CreateProductComponent: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: brandsData } = useGetAllBrandsQuery();

  const initialFormState: Omit<CreateProductDto, "files"> = {
    name: "",
    description: "",
    price: 0,
    oldPrice: null,
    quantity: 1,
    rate: 0,
    soldPerMonth: 0,
    amountOfComments: 0,
    categoryId: "",
    brandId: "",
  };

  const [formData, setFormData] = useState<Omit<CreateProductDto, "files">>(initialFormState);
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateProductDto = {
      ...formData,
      files,
    };

    try {
      await createProduct(payload).unwrap();
      alert("Продукт успішно додано!");
      handleCancel();
    } catch (error) {
      console.error("Помилка при додаванні продукту:", error);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="custom-card">
        <h2 className="custom-title">Додати новий продукт</h2>

        <form onSubmit={handleSubmit}>
          {/* Назва та Ціна */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control custom-input"
                placeholder="Назва товару"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="price"
                className="form-control custom-input"
                placeholder="Ціна"
                value={formData.price || ""}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>

          {/* Стара ціна та Кількість */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="number"
                name="oldPrice"
                className="form-control custom-input"
                placeholder="Стара ціна (необов'язково)"
                value={formData.oldPrice ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    oldPrice: e.target.value ? Number(e.target.value) : null,
                  }))
                }
                min="0"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="quantity"
                className="form-control custom-input"
                placeholder="Кількість"
                value={formData.quantity || ""}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>

          {/* Рейтинг, Продажі, Коментарі */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <input
                type="number"
                name="rate"
                className="form-control custom-input"
                placeholder="Рейтинг (0-5)"
                value={formData.rate || ""}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="soldPerMonth"
                className="form-control custom-input"
                placeholder="Продажів/міс"
                value={formData.soldPerMonth || ""}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="AmountOfComments"
                className="form-control custom-input"
                placeholder="Коментарі"
                value={formData.amountOfComments || ""}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          {/* Категорія та Бренд */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <select
                name="categoryId"
                className="form-select custom-input"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Оберіть категорію</option>
                {categoriesData?.payload?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <select
                name="brandId"
                className="form-select custom-input"
                value={formData.brandId}
                onChange={handleInputChange}
                required
              >
                <option value="">Оберіть бренд</option>
                {brandsData?.payload?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Опис */}
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control custom-input"
              placeholder="Опис товару"
              rows={3}
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Файли */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control custom-input"
              onChange={handleFileChange}
            />
          </div>

          {/* Кнопки дій */}
          <div className="d-flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-blue-submit flex-fill"
            >
              {isLoading ? "Створення..." : "Додати продукт"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-blue-outline flex-fill"
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductComponent;