import { createSlice } from '@reduxjs/toolkit';
import { fetchPayments } from '@/Redux/ThunkFunction/Payment';
const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const Payment = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default Payment.reducer;
