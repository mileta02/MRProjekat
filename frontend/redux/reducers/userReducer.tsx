import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  message: string | null;
  error: string | null;
  isAuthenticated: boolean;
  user: any;
}

const initialState: UserState = {
  loading: false,
  message: null,
  error: null,
  isAuthenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loadUserRequest(state) {
      state.loading = true;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    registerRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = true;
    },
    loadUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    },
    registerSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loadUserFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registerFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
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
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  registerRequest,
  registerSuccess,
  registerFail,
  clearError,
  clearMessage,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
