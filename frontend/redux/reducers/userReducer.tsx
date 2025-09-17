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
    //login actions
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.message = null;
    },
    //loadUser actions
    loadUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = null;
      state.error = null;
    },
    loadUserFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },
    //logout actions
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
      state.error = null;
    },
    logoutFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
      state.message = null;
    },
    //register actions
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.error = null;
    },
    registerFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
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
