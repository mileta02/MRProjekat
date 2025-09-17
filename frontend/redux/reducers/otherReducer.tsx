import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OtherState {
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: OtherState = {
  loading: false,
  message: null,
  error: null,
};

export const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    //update password actions
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updatePasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //update profile actions
    updateProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //update picture actions
    updatePicRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updatePicSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updatePicFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //place order actions
    placeOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    placeOrderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //process order actions
    processOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    processOrderSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    processOrderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //add category actions
    addCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addCategorySuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //delete category actions
    deleteCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //add product actions
    addProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addProductFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //update product actions
    updateProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProductFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //update product image actions
    updateProductImageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductImageSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProductImageFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //delete product image actions
    deleteProductImageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductImageSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteProductImageFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //delete product actions
    deleteProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteProductFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //forget password actions
    forgetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    forgetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    forgetPasswordFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //reset password actions
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    resetPasswordFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //clear actions
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
});

export const {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePicRequest,
  updatePicSuccess,
  updatePicFail,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFail,
  processOrderRequest,
  processOrderSuccess,
  processOrderFail,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  addProductRequest,
  addProductSuccess,
  addProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  updateProductImageRequest,
  updateProductImageSuccess,
  updateProductImageFail,
  deleteProductImageRequest,
  deleteProductImageSuccess,
  deleteProductImageFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  clearError,
  clearMessage,
} = otherSlice.actions;

export const otherReducer = otherSlice.reducer;
