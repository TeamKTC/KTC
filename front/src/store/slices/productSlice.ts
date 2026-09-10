
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/types";

const initialProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  rate: 0,
  soldPerMonth: 0,
  categoryId: "",
  brandId: "",
  amountOfComments: 0,
};

const ProductSlice = createSlice({
  name: "product",
  initialState: initialProduct,

  reducers: {
    productSet(state, action: PayloadAction<Product>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.quantity = action.payload.quantity;
      state.rate = action.payload.rate;
      state.soldPerMonth = action.payload.soldPerMonth;
      state.categoryId = action.payload.categoryId;
      state.brandId = action.payload.brandId;
      state.amountOfComments = action.payload.amountOfComments;
    },

    productClear(state) {
      state.id = "";
      state.name = "";
      state.description = "";
      state.price = 0;
      state.quantity = 0;
      state.rate = 0;
      state.soldPerMonth = 0;
      state.categoryId = "";
      state.brandId ="";
      state.amountOfComments = 0;
    },
  },
});

export const {
  productSet,
  productClear,
} = ProductSlice.actions;

export default ProductSlice.reducer;

