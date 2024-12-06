import { createSlice } from "@reduxjs/toolkit"
import { fetchNotifications } from "@/Redux/ThunkFunction/Notification"
const initialState ={
    notificationRelatedState:{
        notificationList:[],
        hasNewNotiFication:false
    }
}
const notiFications=createSlice({
    name:"notifications",
    initialState,
    reducers:{
        setNotificationRelatedState(state,action){
            return {
                ...state,
                notificationRelatedState:action.payload
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotifications.fulfilled,(state,action)=>{
            state.notificationRelatedState.notificationList=action.payload;
        })
        builder.addCase(fetchNotifications.rejected,(state)=>{
            state.notificationRelatedState.hasNewNotiFication=false;
        })
    }
})
export default notiFications.reducer;
export const {setNotificationRelatedState}=notiFications.actions;
