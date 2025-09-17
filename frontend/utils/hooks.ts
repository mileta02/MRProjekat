import { getAdminProducts } from "@/redux/actions/productActions";
import { clearError, clearMessage } from "@/redux/reducers/userReducer";
import { clearError as clearOtherError, clearMessage as clearOtherMessage } from "@/redux/reducers/otherReducer";
import { AppDispatch, RootState, server } from "@/redux/store";
import axios from "axios";
import { RelativePathString, router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { clearProductError } from "@/redux/reducers/productReducer";

export const useMessageErrorUser = (dispatch: AppDispatch, navigateTo: string = "login") => {
  const { loading, message, error } = useSelector(
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
  }, [error, message, dispatch, navigateTo]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch: AppDispatch,
  navigateTo?: string,
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
      dispatch(clearOtherError());
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch(clearOtherMessage());
      navigateTo && router.push(navigateTo as RelativePathString);
    }
  }, [error, message, dispatch, navigateTo]);

  return loading;
};

export const useSetCategories = (setCategories: (categories: any[]) => void, isFocused: boolean) => {

  useEffect(() => {
    axios.get(`${server}/product/categories`).then(res=>{
      setCategories(res.data.categories);
    }).catch(e=>{
      Toast.show({
        type: "error",
        text1: e.response.data.message
      })
    })
  },[isFocused, setCategories])
}

export const useGetOrders = (isFocused: boolean, isAdmin: boolean = false) => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/order/${isAdmin ? "admin" : "my"}`).then(res=>{
      setOrders(res.data.orders);
      setLoading(false);
    }).catch(e=>{
      Toast.show({
        type: "error",
        text1: e.response.data.message
      })
    }).finally(()=>{
      setLoading(false);
    })

  },[isFocused, isAdmin])

  return {orders, loading};
}

export const useAdminProducts = (dispatch: AppDispatch, isFocused: boolean) => {
  const { products, inStock, outOfStock, error, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch(clearProductError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, isFocused]);

  return {
    products,
    inStock,
    outOfStock,
    loading,
  };
};