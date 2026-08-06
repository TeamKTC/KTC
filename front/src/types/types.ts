export interface Product {
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  price: number;
  rate: number;
  soldPerMonth: number;
  categoryId: string;
  brandId: string;
}

export interface ServiceResponse<T> {
  message: string;
  isSuccess: boolean;
  payload: T | null;
  statusCode: number;
}

export interface CreateProductDto {
  Name: string;
  Description?: string;
  Price: number;
  Quantity: number;
  Rate: number;
  SoldPerMonth: number;
  CategoryId: string;
  Files: File[];
  brandId: string;
}

export interface UpdateProductDto {
  Id: string;
  Name: string;
  Description?: string;
  Price: number;
  Quantity: number;
  Rate: number;
  SoldPerMonth: number;
  CategoryId: string;
  brandId: string;
}

export interface Brand  {
  id: string;
  name: string;
  description: string;
};

export interface Category  {
  id: string;
  name: string;
};

export interface Favorite {
    productId: string;
}