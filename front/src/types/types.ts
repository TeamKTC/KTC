export interface Product {
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  amountOfComments: number;
  price: number;
  rate: number;
  soldPerMonth: number;
  categoryId: string;
  brandId: string;
  oldPrice?: number | null;
}

export interface ServiceResponse<T> {
  message: string;
  isSuccess: boolean;
  payload: T | null;
  statusCode: number;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  rate: number;
  soldPerMonth: number;
  categoryId: string;
  files: File[];
  brandId: string;
  oldPrice?: number | null;
}

export interface UpdateProductDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  rate: number;
  soldPerMonth: number;
  categoryId: string;
  brandId: string;
  oldPrice?: number | null;
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

export interface AttributeDefinition {
  id: string;
  name: string;
  type: string;
}

export interface ProductAttribute {
  id: string;
  productId: string;
  attributeDefinitionId: string;
  value: string;
}
export interface Favorite {
    productId: string;
}

export interface Comment{
  id: string;
  text: string;
  rateOfProduct: number;
  productId: string;
  userId: string;
  parentCommentId: string;
}

export interface CreateCommentDto {
  text: string;
  rateOfProduct: number;
  productId: string;
  userId: string;
  parentCommentId?: string | null;
}

export interface UpdateCommentDto {
  id: string;
  text: string;
  rateOfProduct: number;
}

export interface MediaFile {
  fileName: string;
  url: string;
  contentType: string;
  displayOrder: number;
  size: number;
  type: string;
}