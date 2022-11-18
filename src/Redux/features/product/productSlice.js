import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  data: null,
  isLoading: false,
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

export const productSlice = createSlice({
  name: "product",
  initialState,
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
      });
  },
});

// export const {  } = productSlice.actions;
export default productSlice.reducer;
