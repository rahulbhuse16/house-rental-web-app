import { createHouse, fetchHouseList } from "@/Redux/ThunkFunction/HouseList";
import { createSlice,} from "@reduxjs/toolkit";

const initialState = {
  houseListRelatedState:{
    isLoading:false,
    hasError:false,
    houseList:[]
  }
};

const houseListInfo = createSlice({
  name: "houseData",
  initialState,
  reducers: {
    setHouseListRelatedState(state,action){
      return{
        ...state,
        houseListRelatedState:action.payload
      }
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchHouseList.pending,(state)=>{
      state.houseListRelatedState.isLoading=true;
      state.houseListRelatedState.hasError=false;
    })
    builder.addCase(fetchHouseList.fulfilled,(state,action)=>{
      state.houseListRelatedState.houseList=action.payload;
      state.houseListRelatedState.isLoading=false;
      state.houseListRelatedState.hasError=false;
    })
    builder.addCase(fetchHouseList.rejected,(state)=>{
      state.houseListRelatedState.isLoading=false;
      state.houseListRelatedState.hasError=true;

    })
    builder.addCase(createHouse.fulfilled,(state,action)=>{
           state.houseListRelatedState.hasError=false
    })
  }
});

export const { setHouseListRelatedState } = houseListInfo.actions;

export default houseListInfo.reducer;
