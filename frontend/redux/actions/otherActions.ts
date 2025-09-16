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
  updatePicFail
} from "../reducers/otherReducer";

export const updatePassword =
  (oldPassword: string, newPassword: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${server}/user/changepassword`,
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

    const { data } = await axios.post(
      `${server}/user/updateProfilePicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updatePicSuccess(data.message));
  } catch (error: any) {
    dispatch(updatePicFail(error.response?.data?.message || error.message));
  }
};
