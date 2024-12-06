import { login, signUP } from "@/Redux/ThunkFunction/Authetication"
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    authState: {
        email: '',
        password: '',
        role: localStorage.getItem('role') || '',
        isVerified:false,
        id: localStorage.getItem('id') || 0,
        token: localStorage.getItem('token') || ''

    }
}
const authInfo = createSlice({
    name: 'authInfo',
    initialState,
    reducers: {
        setAuthRelatedState(state, action) {
            return {

                ...state,
                authState: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUP.pending, (state) => {
            state.authState.isVerified = false;
        })
        builder.addCase(signUP.fulfilled, (state, action) => {
            
            state.authState.isVerified = true;
            state.authState.id = action.payload;
            localStorage.setItem('id',action.payload);
            localStorage.setItem('role',state.authState.role)
        })
        builder.addCase(signUP.rejected, (state) => {
            state.authState.isVerified = false;

        })
        builder.addCase(login.pending, (state, action) => {
            state.authState.isVerified = false;

        })

        builder.addCase(login.fulfilled, (state, action) => {
            console.log("succes",action.payload)
            state.authState.isVerified = true;
            localStorage.setItem('role',action.payload.role)
            state.authState.token = action.payload.token;
            localStorage.setItem('token',action.payload.token)
            state.authState.role = action.payload.userRole;
            state.authState.id=action.payload.id;
            localStorage.setItem('id',action.payload.id)

        })
        builder.addCase(login.rejected, (state, action) => {
            state.authState.isVerified = false;

        })
    }

})
export const { setAuthRelatedState } = authInfo.actions;
export default authInfo.reducer;