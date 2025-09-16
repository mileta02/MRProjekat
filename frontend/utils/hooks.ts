import { clearError, clearMessage } from "@/redux/reducers/userReducer";
import { AppDispatch, RootState } from "@/redux/store";
import { RelativePathString, router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export const useMessageErrorUser = (dispatch: AppDispatch, navigateTo: string = "login") => {
  const { loading, message, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch(clearError());
    }
    if (message) {
      router.replace(`/${navigateTo}` as RelativePathString);
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch(clearMessage());
    }
  }, [ error, message]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch: AppDispatch,
  navigation?: any,
  navigateTo?: string,
  func?: () => any
) => {
  const { loading, message, error } = useSelector(
    (state: RootState) => state.other
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch(clearError());
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch(clearMessage());
      navigateTo && navigation.navigate(navigateTo);
      func && dispatch(func());
    }
  }, [error, message, dispatch, navigation, navigateTo, func]);

  return loading;
};
