import axios from "axios";
import { AppDispatch, server } from "../store";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
} from "../reducers/userReducer";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loginRequest());
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(loginSuccess(data.message));
    } catch (error: any) {
      dispatch(loginFail(error.message));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess(data.message));
  } catch (error: any) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/myProfile`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error: any) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const register = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(`${server}/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch(registerSuccess(data.message));
  } catch (error: any) {
    dispatch(registerFail(error.response.data.message));
  }
};
