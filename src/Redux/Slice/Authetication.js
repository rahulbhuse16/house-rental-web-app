import { signUP } from "../ThunkFunction/Authetication"

const { createSlice } = require("@reduxjs/toolkit")

const initialState={
    authState:{
        email:'',
        password:'',
        role:'',
        isAuthenticated:false

    }
}
const authInfo=createSlice({
    name:'authInfo',
    initialState,
    reducers:{
        setAuthRelatedState(state,action){
            return {
                
                ...state,
                authState:action.payload
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUP.fulfilled,(state,action)=>{
            state.authState.isAuthenticated=true;
        })
    }
})
export const {setAuthRelatedState}=authInfo.actions;
export default authInfo.reducer;