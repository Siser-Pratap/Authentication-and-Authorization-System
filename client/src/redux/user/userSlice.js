import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser:null, 
    error:false, 
    loading:false,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
            state.error = false;
        },
        signInSuccess : (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action)=>{
            state.loading = false;
            state.error = false;
        },
        updateUserStart : (state, action)=>{
            state.loading = true;
            state.error = false;
        },
        updateUserSuccess : (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure : (state, action)=>{
            state.error = true;
            state.loading = false;
        },
        deleteUserStart : (state, action)=>{
           
            state.loading = true;
           
        },
        deleteUserSuccess : (state, action)=>{
            state.currentUser = null,
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure : (state, action)=>{
            state.error = true;
            state.loading = false;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
    }
});

export const {signInFailure, signInSuccess, signInStart, updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut} = userSlice.actions;

export default userSlice.reducer;