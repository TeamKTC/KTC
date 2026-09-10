import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../../store/services/categoryApi";
import type { CreateCategoryDto } from "../../../types/types";
import "./CreateCategoryComponent.css";

const CreateCategoryComponent: React.FC = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const initialFormState: CreateCategoryDto = {
    name: "",
  };

  const [formData, setFormData] = useState<CreateCategoryDto>(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Відправляємо звичайний JSON об'єкт
      await createCategory(formData).unwrap();
      alert("Категорію успішно додано!");
      handleCancel();
    } catch (error) {
      console.error("Помилка при додаванні категорії:", error);
    }
  };

  return (
    <div className="container py-2" style={{ maxWidth: "800px" }}>
      <div className="custom-card">
        <h2 className="custom-title">Додати нову категорію</h2>

        <form onSubmit={handleSubmit}>
          {/* Назва категорії */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              className="form-control custom-input"
              placeholder="Назва категорії"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Кнопки дій */}
          <div className="d-flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-blue-submit flex-fill"
            >
              {isLoading ? "Створення..." : "Додати категорію"}
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

export default CreateCategoryComponent;