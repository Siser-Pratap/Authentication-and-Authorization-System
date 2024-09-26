import {creatSlice} from "@redux/toolkit";


const initialState = {
    currentUser: null,
    loading:false,
    error:false,
};

const userSlice = creatSlice({
    name:'user',
    initialState,
    reducers:{
       signInStart:(state)=>{
        state.loading = true;
       },
       signInSuccess:(state, action)=>{
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
        },
        SignInFailure:(state, action)=>{
            state.loading = false;
            state.error=action.payload;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.action;

export default userSlice.reducers;
