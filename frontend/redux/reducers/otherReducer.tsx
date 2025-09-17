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
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updateProfileRequest(state) {
      state.loading = true;
    },
    updatePicRequest(state) {
      state.loading = true;
    },
    placeOrderRequest(state) {
      state.loading = true;
    },
    placeOrderSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    placeOrderFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePicSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePicFail(state, action: PayloadAction<string>) {
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
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateProfileRequest,
  updateProfileFail,
  updateProfileSuccess,
  clearError: clearOtherError,     // ← Preimenovati da se izbegnu konflikti
  clearMessage: clearOtherMessage, // ← Preimenovati da se izbegnu konflikti
  updatePicFail,
  updatePicRequest,
  updatePicSuccess,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFail
} = otherSlice.actions;

export const otherReducer = otherSlice.reducer;
