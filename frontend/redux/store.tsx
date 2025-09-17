
import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
    reducer:{
        user: userReducer,
        other: otherReducer,
        product: productReducer,
        cart: cartReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const server = "http://192.168.1.12:5001/api";