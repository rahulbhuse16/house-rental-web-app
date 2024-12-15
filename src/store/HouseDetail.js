import { createSlice } from "@reduxjs/toolkit"
import { fetchHouseDetails } from "@/Redux/ThunkFunction/HouseList"
const initialState={
    houseDetailState:{
        id:0,
        houseName:"",
        address:"",
        sellerName:"",
        rentalOfferPrice:0,
        rentalOriginalPrice:0,
        noOfBedrooms:0,
        bathRooms:0,
        houseArea:0,
        description:"",
        images:[],
        isLoading:false,
        hasError:false,
        houseStatus:'',
        mobileNumber:''
    }
}
const houseDetail=createSlice({
    name:'houseDetail',
    initialState,
    reducers:{
        setHouseDetailState(state,action){
            return {
                ...state,
                houseDetailState:action.payload
            }

        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchHouseDetails.pending,(state)=>{
            state.houseDetailState.isLoading=false;

        })
        builder.addCase(fetchHouseDetails.fulfilled,(state,action)=>{
            state.houseDetailState.isLoading=false;
            state.houseDetailState.houseName=action.payload?.houseName;
            state.houseDetailState.id=action.payload?.id;
            state.houseDetailState.address=action.payload?.address;
            state.houseDetailState.bathRooms=action.payload?.bathRooms;
            state.houseDetailState.houseArea=action.payload?.houseArea;
            state.houseDetailState.noOfBedrooms=action.payload?.noOfBedrooms;
            state.houseDetailState.description=action.payload?.description;
            state.houseDetailState.images=action.payload?.images;
            state.houseDetailState.rentalOfferPrice=action.payload?.rentalOfferPrice;
            state.houseDetailState.rentalOriginalPrice=action.payload?.rentalOriginalPrice;
            state.houseDetailState.sellerName=action.payload?.sellerName;
            state.houseDetailState.houseStatus=action.payload.houseStatus;
            state.houseDetailState.mobileNumber=action.payload.mobileNumber


        })
    }
})
export default houseDetail.reducer;
export const {setHouseDetailState}=houseDetail.actions;
