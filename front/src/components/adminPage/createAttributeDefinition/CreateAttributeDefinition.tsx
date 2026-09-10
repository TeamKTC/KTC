import React, { useState } from "react";
import { useCreateAttributeDefinitionMutation } from "../../../store/services/attributeDefinitionApi";
import type { CreateAttributeDefinitionDto } from "../../../types/types";

const CreateAttributeDefinitionComponent: React.FC = () => {
  const [createAttributeDefinition, { isLoading }] =
    useCreateAttributeDefinitionMutation();

  const initialFormState: CreateAttributeDefinitionDto = {
    name: "",
    type: "string", // Значення за замовчуванням
  };

  const [formData, setFormData] =
    useState<CreateAttributeDefinitionDto>(initialFormState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    try {
      await createAttributeDefinition(formData).unwrap();
      alert("Визначення атрибута успішно додано!");
      handleCancel();
    } catch (error) {
      console.error("Помилка при додаванні визначення атрибута:", error);
    }
  };

  return (
    <div className="container py-2" style={{ maxWidth: "800px" }}>
      <div className="custom-card">
        <h2 className="custom-title">Додати визначення атрибута</h2>

        <form onSubmit={handleSubmit}>
          {/* Назва атрибута */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control custom-input"
              placeholder="Назва атрибута (наприклад: Колір, Вага)"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Тип атрибута (Select: string / integer) */}
          <div className="mb-4">
            <select
              name="type"
              className="form-select custom-input"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="string">string</option>
              <option value="integer">integer</option>
            </select>
          </div>

          {/* Кнопки дій */}
          <div className="d-flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-blue-submit flex-fill"
            >
              {isLoading ? "Створення..." : "Додати атрибут"}
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

export default CreateAttributeDefinitionComponent;