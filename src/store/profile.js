import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfileById } from '@/Redux/ThunkFunction/Profile';

const initialState = {
  user: {
    id: 0,
    username: '',
    role: '',
    createdAt: '',
    updatedAt: '',
  },
    Houses: [], // List of houses (assuming it's an array of house objects)
    Payments: [], // List of payments (assuming it's an array of payment objects)
    totalHousesBought: 0, // Total count of houses bought
    totalPayments: 0, // Total amount paid
  
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.Houses=action.payload.Houses
        state.Payments=action.payload.Payments;
        state.totalHousesBought=action.payload.totalHousesBought;
        state.totalPayments=action.payload.totalPayments;
        state.user=action.payload.user;
        
        
       
      })
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
