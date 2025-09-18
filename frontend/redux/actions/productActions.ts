import axios from "axios";
import { AppDispatch, server } from "../store";
import {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  getAdminProductsRequest,
  getAdminProductsSuccess,
  getAdminProductsFail,
  getProductDetailsRequest,
  getProductDetailsSuccess,
  getProductDetailsFail,
} from "../reducers/productReducer";

export const getAllProducts = (keyword: string, category: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAllProductsRequest());
    
    const { data } = await axios.get(
      `${server}/product/all?keyword=${keyword}&category=${category}`,
      {
        withCredentials: true,
      }
    );

    dispatch(getAllProductsSuccess(data.products));
  } catch (error: any) {
    dispatch(getAllProductsFail(error.response.data.message));
  }
};

export const getAdminProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAdminProductsRequest());
    
    const { data } = await axios.get(`${server}/product/adminProducts`, {
      withCredentials: true,
    });

    dispatch(getAdminProductsSuccess(data));
  } catch (error: any) {
    dispatch(getAdminProductsFail(error.response.data.message));
  }
};

export const getProductDetails = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getProductDetailsRequest());

    const { data } = await axios.get(`${server}/product/${id}`, {
      withCredentials: true,
    });

    dispatch(getProductDetailsSuccess(data.product));
  } catch (error: any) {
    dispatch(getProductDetailsFail(error.response.data.message));
  }
};
