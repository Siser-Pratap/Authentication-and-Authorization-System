import {configureStore} from "redux/toolkit";
import { serialize } from "v8";

export const store = configureStore({
    reducer:{},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializeableCheck:false,
    }),
});