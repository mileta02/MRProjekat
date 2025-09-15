
import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
    reducer:{
        user: userReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const server = "http://192.168.1.12:5001/api";