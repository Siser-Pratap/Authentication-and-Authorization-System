import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser:null, 
    error:false, 
    loading:false,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducer:{
        signInUrl: (state)=>{
            state.loading = true;
        },
        signInSuccess : (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = action.payload;
        },
        signInFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {signInFailure, signInSuccess, signInUrl} = userSlice.actions;

export default userSlice.reducer;