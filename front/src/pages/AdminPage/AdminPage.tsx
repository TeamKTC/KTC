import { useState } from 'react';
import './AdminPage.css'; 
import CreateProductComponent from '../../components/adminPage/createProductComponent/CreateProductComponent';
import CreateBrandComponent from '../../components/adminPage/createBrandComponent/CreateBrandComponent';
import CreateCategoryComponent from '../../components/adminPage/createCategoryComponent/CreateCategoryComponent';
import CreateAttributeDefinitionComponent from '../../components/adminPage/createAttributeDefinition/CreateAttributeDefinition';
import CreateProductAttributeComponent from '../../components/adminPage/createProductAttribute/createProductAttribute';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('product');

    return (
        <div className="admin-page-container container py-4">
            {/* Заголовок по центру */}
            <h1 className="text-center mb-4 fw-bold text-dark fs-3">
                Панель адміністратора
            </h1>

            {/* Навігаційні кнопки, відцентровані за допомогою d-flex justify-content-center */}
            <div className="d-flex justify-content-center mb-4">
                <ul className="nav nav-pills custom-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'product' ? 'active' : ''}`}
                            onClick={() => setActiveTab('product')}
                        >
                            Продукт
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'category' ? 'active' : ''}`}
                            onClick={() => setActiveTab('category')}
                        >
                            Категорія
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'brand' ? 'active' : ''}`}
                            onClick={() => setActiveTab('brand')}
                        >
                            Бренд
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'attribute' ? 'active' : ''}`}
                            onClick={() => setActiveTab('attribute')}
                        >
                            Атрибути
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'productattribute' ? 'active' : ''}`}
                            onClick={() => setActiveTab('productattribute')}
                        >
                            Атрибути для продуктів
                        </button>
                    </li>
                    
                </ul>
            </div>

            {/* Контентний блок */}
            <div className="admin-content-area">
                {activeTab === 'product' && <CreateProductComponent />}

                {activeTab === 'category' && <CreateCategoryComponent />}

                {activeTab === 'brand' && <CreateBrandComponent />}

                {activeTab === 'attribute' && <CreateAttributeDefinitionComponent />}

                {activeTab === 'productattribute' && <CreateProductAttributeComponent/>}
            </div>
        </div>
    );
};

export default AdminPage;