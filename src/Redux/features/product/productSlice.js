import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (thunkAPI) => {
    try {
      const response = await productService.getAllProduct();
      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (id, thunkAPI) => {
    try {
      const response = await productService.getProductDetail(id);
      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async (dataProduct, thunkAPI) => {
    try {
      const response = await productService.addNewProduct(dataProduct);
      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(data);
      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productService.editProduct(data);
      return response;
    } catch (error) {
      const message = error.response.data.message || error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editImgProduct = createAsyncThunk(
  "product/editImgProduct",
  async (data, thunkAPI) => {
    try {
      const response = await productService.editImgProduct(data);
      return response;
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editImgProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editImgProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(editImgProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
