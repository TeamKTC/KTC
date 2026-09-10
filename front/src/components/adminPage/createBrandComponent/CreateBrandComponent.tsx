import React, { useState } from "react";
import { useCreateBrandMutation } from "../../../store/services/brandApi";
import type { CreateBrandDto } from "../../../types/types";
import "./CreateBrandComponent.css";

const CreateBrandComponent: React.FC = () => {
  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const initialFormState: CreateBrandDto = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState<CreateBrandDto>(initialFormState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const formDataToSend = new FormData();
  formDataToSend.append("Name", formData.name);
  formDataToSend.append("Description", formData.description);

  try {
    await createBrand(formDataToSend as unknown as CreateBrandDto).unwrap();
    alert("Бренд успішно додано!");
    handleCancel();
  } catch (error) {
    console.error("Помилка при додаванні бренду:", error);
  }
};

  return (
    <div className="container py-2" style={{ maxWidth: "800px" }}>
      <div className="custom-card">
        <h2 className="custom-title">Додати новий бренд</h2>

        <form onSubmit={handleSubmit}>
          {/* Назва бренду */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control custom-input"
              placeholder="Назва бренду"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Опис бренду */}
          <div className="mb-4">
            <textarea
              name="description"
              className="form-control custom-input"
              placeholder="Опис бренду"
              rows={4}
              value={formData.description}
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
              {isLoading ? "Створення..." : "Додати бренд"}
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

export default CreateBrandComponent;