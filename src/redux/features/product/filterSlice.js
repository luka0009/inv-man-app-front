import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
        const { products, search } = action.payload;
        const tempProducts = products.products?.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
  
        state.filteredProducts = tempProducts;
    },
  },
});

export const { filterProducts } = filterSlice.actions;
export default filterSlice.reducer;
