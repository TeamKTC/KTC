
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Brand } from "../../types/types";

const initialBrand: Brand = {
  id: "",
  name: "",
  description: "",
};

const BrandSlice = createSlice({
  name: "brand",
  initialState: initialBrand,

  reducers: {
    brandSet(state, action: PayloadAction<Brand>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },

    brandClear(state) {
      state.id = "";
      state.name = "";
      state.description = "";
    },
  },
});

export const {
  brandSet,
  brandClear,
} = BrandSlice.actions;

export default BrandSlice.reducer;

