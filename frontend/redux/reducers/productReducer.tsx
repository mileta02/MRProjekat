import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  loading: boolean;
  message: string | null;
  error: string | null;
  products: any[];
  product: any;
  inStock: number;
  outOfStock: number;
}

const initialState: ProductState = {
  loading: false,
  message: null,
  error: null,
  products: [],
  product: {},
  inStock: 0,
  outOfStock: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProductsRequest(state) {
      state.loading = true;
    },
    getAdminProductsRequest(state) {
      state.loading = true;
    },
    getProductDetailsRequest(state) {
      state.loading = true;
    },
    getAllProductsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.products = action.payload;
    },
    getAdminProductsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.products = action.payload.products;
      state.inStock = action.payload.inStock;
      state.outOfStock = action.payload.outOfStock;
    },
    getProductDetailsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.product = action.payload;
    },
    getAllProductsFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminProductsFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getProductDetailsFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const {
  getAllProductsRequest,
  getAdminProductsRequest,
  getProductDetailsRequest,
  getAllProductsSuccess,
  getAdminProductsSuccess,
  getProductDetailsSuccess,
  getAllProductsFail,
  getAdminProductsFail,
  getProductDetailsFail,
  clearError,
  clearMessage,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
