
import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";

export const store = configureStore({
    reducer:{
        user: userReducer,
        other: otherReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const server = "http://192.168.1.12:5001/api";