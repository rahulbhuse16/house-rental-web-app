import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
import { toast } from 'react-toastify';

export const createHouse = createAsyncThunk(
  'houseList/createHouse',
  async ({ 
    houseName,
    address,
    sellerName,
    rentalOfferPrice,
    rentalOriginalPrice,
    FlatType,
    houseArea,
    description,
    userId,
    images,
    houseType,
    token,
    mobileNumber
  }, thunkApi) => {
    try {
        console.log("calling")
        

        // Add Authorization token to the headers
        const response = await axios.post(
            'http://localhost:5000/api/v1/houses/add',
            {
                houseName,
                address,
                sellerName,
                rentalOfferPrice,
                rentalOriginalPrice,
                FlatType,
                houseArea,
                description,
                userId,
                images,
                houseType,
                mobileNumber
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in the headers
                },
            }
        );
        
        // If the request was successful, show success message and return the data
        toast.success(response.data.message || "House Added Successfully");
        return thunkApi.fulfillWithValue(response.data);

    } catch (err) {
        // Log the error and display the error message in the toast
        console.error("Error:", err);
        const errorMessage = err.response?.data?.error || 'House Registration failed';
        toast.error(errorMessage);  // Display backend error in toast
        return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const fetchHouseList=createAsyncThunk('houseList/fetchList', async ({ 
      token
     }, thunkApi) => {
        console.log("called")
    try {
        const response = await axios.get('http://localhost:5000/api/v1/houses/list',{headers:{
             Authorization: `Bearer ${token}`


        }});
        toast.success(response.data.message);
        console.log("data",response.data)
        return thunkApi.fulfillWithValue(response.data);

    } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed To Fetch HouseList';
        toast.error(errorMessage); // Display backend error in toast
        return thunkApi.rejectWithValue(errorMessage);
    }



})

export const fetchHouseDetails=createAsyncThunk('houseDetail/fetchHouse', async ({ 
    token,
    id
   }, thunkApi) => {
      console.log("called")
  try {
      const response = await axios.get(`http://localhost:5000/api/v1/houses/${id}`,{headers:{
           Authorization: `Bearer ${token}`


      }});
      toast.success(response.data.message);
      console.log({

      })
      return thunkApi.fulfillWithValue({
        id:response.data.house.id,
        houseName:response.data.house.houseName,
        address:response.data.house.address,
        sellerName:response.data.house.sellerName,
        rentalOfferPrice:response.data.house.rentalOfferPrice,
        rentalOriginalPrice:response.data.house.rentalOriginalPrice,
        noOfBedrooms:response.data.house.noOfBedrooms,
        bathRooms:response.data.house.bathrooms,
        houseArea:response.data.house.houseArea,
        description:response.data.house.description,
        images:response.data.house.images,
        houseStatus:response.data.houseStatus,
        mobileNumber:response.data.mobileNumber
      });

  } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed To Fetch House';
      toast.error(errorMessage); // Display backend error in toast
      return thunkApi.rejectWithValue(errorMessage);
  }



})

