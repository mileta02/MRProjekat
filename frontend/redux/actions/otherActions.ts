import axios from "axios";
import { AppDispatch, server } from "../store";
import { 
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
  resetPasswordFail
} from "../reducers/otherReducer";

export const updatePassword =
  (oldPassword: string, newPassword: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${server}/user/changePassword`,
        { oldPassword, newPassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(updatePasswordSuccess(data.message));
    } catch (error: any) {
      dispatch(updatePasswordFail(error.response?.data?.message || error.message));
    }
  };

  export const updateProfile =
  (name: string, email: string, address: string, city: string, country: string, pinCode: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProfileRequest());

      const { data } = await axios.put(
        `${server}/user/updateProfile`,
        { name, email, address, city, country, pinCode },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(updateProfileSuccess(data.message));
    } catch (error: any) {
      dispatch(updateProfileFail(error.response?.data?.message || error.message));
    }
  };

  export const updatePic = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updatePicRequest());
    const { data } = await axios.put(
      `${server}/user/updateProfilePicture`,
      formData,
      {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        withCredentials: true,
      }
    );
    dispatch(updatePicSuccess(data.message));
  } catch (error: any) {
    dispatch(updatePicFail(error.response?.data?.message || error.message));
  }
};

export const placeOrder =
  (cartItems: any, shippingInfo: any, paymentMethod: any, itemsPrice: any, taxPrice: any, shippingCharges: any, totalAmount: any, paymentInfo?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(placeOrderRequest());

      const { data } = await axios.post(
        `${server}/order/new`,
        { 
          shippingInfo, 
          orderItems: cartItems, 
          paymentMethod, 
          paymentInfo, 
          itemsPrice, 
          taxPrice, 
          shippingCharges, 
          totalAmount 
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(placeOrderSuccess(data.message));
    } catch (error: any) {
      dispatch(placeOrderFail(error.response?.data?.message || error.message));
    }
  };

  export const processOrder =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(processOrderRequest());

      const { data } = await axios.put(
        `${server}/order/single/${id}`,
        { 
          
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(processOrderSuccess(data.message));
    } catch (error: any) {
      dispatch(processOrderFail(error.response?.data?.message || error.message));
    }
  };

  export const addCategory = (category: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(addCategoryRequest());
  
      const { data } = await axios.post(
        `${server}/product/category`,
  
        {
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(addCategorySuccess(data.message));
    } catch (error: any) {
      dispatch(addCategoryFail(error.response?.data?.message || error.message));
    }
  };
  
  export const deleteCategory = (id: string) => async (dispatch: AppDispatch) => {
    console.log(id);
    try {
      dispatch(deleteCategoryRequest());
  
      const { data } = await axios.delete(
        `${server}/product/category/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteCategorySuccess(data.message));
    } catch (error: any) {
      dispatch(deleteCategoryFail(error.response?.data?.message || error.message));
    }
  };
  
  export const createProduct = (formData: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(addProductRequest());
  
      const { data } = await axios.post(`${server}/product/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      dispatch(addProductSuccess(data.message));
    } catch (error: any) {
      dispatch(addProductFail(error.response?.data?.message || error.message));
    }
  };
  
  export const updateProduct =
    (id: string, name: string, description: string, price: number, stock: number, category: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(updateProductRequest());
        const { data } = await axios.put(
          `${server}/product/single/${id}`,
          {
            name,
            description,
            price,
            stock,
            category,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        dispatch(updateProductSuccess(data.message));
      } catch (error: any) {
        dispatch(updateProductFail(error.response?.data?.message || error.message));
      }
    };
  
  export const updateProductImage = (productId: string, formData: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProductImageRequest());
  
      const { data } = await axios.post(
        `${server}/product/images/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      dispatch(updateProductImageSuccess(data.message));
    } catch (error: any) {
      dispatch(updateProductImageFail(error.response?.data?.message || error.message));
    }
  };
  
  export const deleteProductImage = (productId: string, imageId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteProductImageRequest());
  
      const { data } = await axios.delete(
        `${server}/product/images/${productId}?id=${imageId}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch(deleteProductImageSuccess(data.message));
    } catch (error: any) {
      dispatch(deleteProductImageFail(error.response?.data?.message || error.message));
    }
  };
  
  export const deleteProduct = (productId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteProductRequest());
  
      const { data } = await axios.delete(
        `${server}/product/single/${productId}`,
        {
          withCredentials: true,
        }
      );
  
      dispatch(deleteProductSuccess(data.message));
    } catch (error: any) {
      dispatch(deleteProductFail(error.response?.data?.message || error.message));
    }
  };
  
  export const forgetPassword = (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forgetPasswordRequest());
      const { data } = await axios.post(
        `${server}/user/forgetpassword`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      dispatch(forgetPasswordSuccess(data.message));
    } catch (error: any) {
      dispatch(forgetPasswordFail(error.response?.data?.message || error.message));
    }
  };
  
  export const resetPassword = (otp: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const { data } = await axios.put(
        `${server}/user/forgetpassword`,
        {
          otp,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      dispatch(resetPasswordSuccess(data.message));
    } catch (error: any) {
      dispatch(resetPasswordFail(error.response?.data?.message || error.message));
    }
  };