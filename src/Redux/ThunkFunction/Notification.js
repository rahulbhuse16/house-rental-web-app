import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Fetch notifications thunk
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll', // Correct the name here
  async (_, thunkApi) => {
    try {
      console.log("Fetching notifications...");

      const response = await axios.get('http://localhost:5000/api/v1/notifications/all');

      console.log("Data:", response.data);

      return thunkApi.fulfillWithValue(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch notifications';
      toast.error(errorMessage); 
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);
export const delteNotification = createAsyncThunk(
    'notifications/deleteNotification', // Correct the name here
    async ({id}, thunkApi) => {
      try {
        console.log("Fetching notifications...");
  
        const response = await axios.delete(`http://localhost:5000/api/v1/notifications/${id}`);
  
        console.log("Data:", response.data);
        toast.success("Notification Readed")
        return thunkApi.fulfillWithValue(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to fetch notifications';
        toast.error(errorMessage); 
        return thunkApi.rejectWithValue(errorMessage);
      }
    }
  );
