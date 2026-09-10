import React, { useState } from "react";
import { useCreateProductAttributeMutation } from "../../../store/services/productAttributeApi";
import type { CreateProductAttributeDto } from "../../../types/types";
import { useGetAllProductsQuery } from "../../../store/services/productApi";
import { useGetAllAttributeDefinitionsQuery } from "../../../store/services/attributeDefinitionApi";

const CreateProductAttributeComponent: React.FC = () => {
  const [createProductAttribute, { isLoading }] =
    useCreateProductAttributeMutation();

  const { data: productsData } = useGetAllProductsQuery();
  const { data: attributeDefsData } = useGetAllAttributeDefinitionsQuery();
  const products = productsData?.payload || [];
  const attributeDefinitions = attributeDefsData?.payload || [];


  const [formData, setFormData] = useState<CreateProductAttributeDto>({
    productId: "",
    attributeDefinitionId: "",
    value: "",
  });

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
    setFormData({
      productId: "",
      attributeDefinitionId: "",
      value: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productId || !formData.attributeDefinitionId) {
      alert("Будь ласка, оберіть продукт та атрибут!");
      return;
    }

    try {
      await createProductAttribute(formData).unwrap();
      alert("Атрибут продукту успішно додано!");
      handleCancel();
    } catch (error) {
      console.error("Помилка при додаванні атрибута продукту:", error);
    }
  };

  return (
    <div className="container py-2" style={{ maxWidth: "800px" }}>
      <div className="custom-card">
        <h2 className="custom-title">Додати атрибут до продукту</h2>

        <form onSubmit={handleSubmit}>
          {/* Вибір продукту */}
          <div className="mb-3">
            <select
              name="productId"
              className="form-select custom-input"
              value={formData.productId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Оберіть продукт...
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Вибір атрибута */}
          <div className="mb-3">
            <select
              name="attributeDefinitionId"
              className="form-select custom-input"
              value={formData.attributeDefinitionId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Оберіть атрибут...
              </option>
              {attributeDefinitions.map((attr) => (
                <option key={attr.id} value={attr.id}>
                  {attr.name}
                </option>
              ))}
            </select>
          </div>

          {/* Значення атрибута */}
          <div className="mb-4">
            <input
              type="text"
              name="value"
              className="form-control custom-input"
              placeholder="Значення атрибута"
              value={formData.value}
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
              {isLoading ? "Створення..." : "Додати атрибут продукту"}
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

export default CreateProductAttributeComponent;