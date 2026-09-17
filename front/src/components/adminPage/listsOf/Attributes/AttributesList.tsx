import { Trash2 } from "lucide-react";
import type { AttributeDefinition } from "../../../../types/types";
import "./AttributesList.css"; // Звичайний імпорт CSS
import { useDeleteAttributeDefinitionMutation, useGetAllAttributeDefinitionsQuery } from "../../../../store/services/attributeDefinitionApi";

const AttributeDefinitionItem = ({ attributeDefinition }: { attributeDefinition: AttributeDefinition }) => { 
    const [deleteCreditCard] = useDeleteAttributeDefinitionMutation();
  const handleDeleteButton = (id: string) => {
    deleteCreditCard(id);
  };

  return (
    <div className="productCard">
      <div className="productContent">
        <span className="productTitle">
          {attributeDefinition.name}
        </span>
        <span>—</span>
        <span>
          {attributeDefinition.type}
        </span>
      </div>
      <button
            onClick={() => handleDeleteButton(attributeDefinition.id)}
            className="delete-btn"
            aria-label="Видалити картку"
        >
            <Trash2 size={20} />
        </button>
    </div>
  );
};

const AttributeDefinitionsList = () => {
  const { data } = useGetAllAttributeDefinitionsQuery();
  const attributeDefinitions: AttributeDefinition[] = data?.payload ?? [];

  return (
    <div className="productList">
      {attributeDefinitions.map((attributeDefinition: AttributeDefinition) => (
        <AttributeDefinitionItem key={attributeDefinition.id} attributeDefinition={attributeDefinition} />
      ))}
    </div>
  );
};

export default AttributeDefinitionsList;