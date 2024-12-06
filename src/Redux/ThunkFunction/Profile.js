import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfileById = createAsyncThunk(
  'user/fetchProfileById',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/auth/${id}/profile`); // Replace with actual API URL
      const { user,houses,payments, totalHousesBought, totalPayments } = response.data;

      // Fulfill each field individually from backend response
      return fulfillWithValue({
        user,
        Houses: houses,
        Payments: payments,
        totalHousesBought,
        totalPayments,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user profile'
      );
    }
  }
);
