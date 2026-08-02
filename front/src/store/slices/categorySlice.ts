import type { Category } from "../../types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialCategory: Category ={
    id: "",
    name: "",
};

const CategorySlice = createSlice({
    name: "category",
    initialState: initialCategory,
    reducers: {
        categorySet(state, action: PayloadAction<Category>){
            state.id = action.payload.id;
            state.name = action.payload.name;
        },

        categoryClear(state){
            state.id = "";
            state.name ="";
        },
    },
});

export const {
    categorySet,
    categoryClear,
} = CategorySlice.actions

export default CategorySlice.reducer