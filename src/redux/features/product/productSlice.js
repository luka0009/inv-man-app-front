import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createNewProduct, getAllProducts, DeleteProduct, getSingleProduct, updateProduct } from "./productService";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunk) => {
    try {
      return await createNewProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getALl",
  async (_, thunk) => {
    try {
      return await getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunk) => {
    try {
      return await DeleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunk) => {
    try {
      return await getSingleProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({id, formData}, thunk) => {
    try {
      return await updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    calculateStoreValue: (state, action) => {
      const products = action.payload;
      const arr = [];
      products.products?.map((item) => {
        const {price, quantity} = item;
        const productValue = price * quantity;
        return arr.push(productValue);
      });
      const totalValue = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    calculateOutOfStock: (state, action) => {
      const products = action.payload;
      const arr = [];
      products.products?.map((item) => {
        const {quantity} = item;
        return arr.push(quantity);
      });
      let count = 0;
      arr.forEach((number) => {
        if(number === 0 || number === '0') {
          count += 1;
        }
      })
      state.outOfStock = count;
    },
    calculateCategory: (state, action) => {
      const products = action.payload;
      const arr = [];
      products.products?.map((item) => {
        const {category} = item;
        return arr.push(category);
      });
      const uniqueCategory = [...new Set(arr)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(action.payload);
      if(state.products) {
        state.products?.push(action.payload);
      }
      toast.success("Product added successfully");
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(action.payload);
      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      toast.info('Product deleted')
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.product = action.payload;
    })
    .addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(UpdateProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UpdateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      toast.success('product updated succesfully');
    })
    .addCase(UpdateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
  },
});

export const { calculateStoreValue, calculateOutOfStock, calculateCategory } = productSlice.actions;
export default productSlice.reducer;
