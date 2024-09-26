import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

const placeHolderReducer = (state = {}, action) => {
    return state;
};

export const store = configureStore({
    reducer:{
        user:userReducer,
        placeholder: placeHolderReducer,
    },
    middleware : (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});