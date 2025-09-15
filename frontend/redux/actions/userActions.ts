import axios from "axios";
import { AppDispatch, server } from "../store";
import { 
  loginFail, 
  loginRequest, 
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  registerRequest,
  registerSuccess,
  registerFail
} from "../reducers/userReducer";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginRequest());
    console.log(`${server}/user/login`)
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
    console.log(data);
    dispatch(loginSuccess(data.message));
  } catch (error: any) {
    console.log(error)
    dispatch(loginFail(error.response?.data?.message || error.message))
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axios.get(
      `${server}/user/logout`,
      {
        withCredentials: true
      },
    );
    dispatch(logoutSuccess(data.message));
  } catch (error: any) {
    dispatch(logoutFail(error.response?.data?.message || error.message));
  }
};

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(
      `${server}/user/myProfile`,
      {
        withCredentials: true
      },
    );
    dispatch(loadUserSuccess(data.message));
  } catch (error: any) {
    dispatch(loadUserFail(error.response?.data?.message || error.message));
  }
};

export const register = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(
      `${server}/user/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(registerSuccess(data.message));
  } catch (error: any) {
    dispatch(registerFail(error.response?.data?.message || error.message));
  }
};
