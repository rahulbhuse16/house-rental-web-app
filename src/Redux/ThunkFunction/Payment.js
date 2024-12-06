import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
import { toast } from 'react-toastify';

export const purchaseHouse = createAsyncThunk(
  'payment/PurchaseHouse',
  async ({ 
    email,
    userId, 
    houseId, 
    cardHolder, 
    cardNumber, 
    expiryDate, 
    cvc,
    token
  }, thunkApi) => {
    try {
        console.log("calling")
        

        // Add Authorization token to the headers
        const response = await axios.post(
            'http://localhost:5000/api/v1/houses/purchase',

            {
                email,
                userId, 
                houseId, 
                cardHolder, 
                cardNumber, 
                expiryDate, 
                cvc
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in the headers
                },
            }
        );
        
        // If the request was successful, show success message and return the data
        toast.success(response.data.message || "Purchase Successful");
        return thunkApi.fulfillWithValue(response.data);

    } catch (err) {
        // Log the error and display the error message in the toast
        console.error("Error:", err);
        const errorMessage = err.response?.data?.message || 'Purchase failed';
        toast.error(errorMessage);  // Display backend error in toast
        return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const fetchPayments = createAsyncThunk(
    'houseList/fetchList',
    async ({ token, userId }, thunkApi) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/payments/user/${userId}`);
        toast.success(response.data.message);
        console.log("data", response.data);
        return thunkApi.fulfillWithValue(response.data.payments); // Return only the payments array
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed To Fetch Payments';
        toast.error(errorMessage); // Display backend error in toast
        return thunkApi.rejectWithValue(errorMessage);
      }
    }
  );
  