import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 फीस इतिहास लोड करने का API Call
export const fetchFeeHistory = createAsyncThunk(
  "fees/fetchFeeHistory",
  async ({ studentId }, { rejectWithValue }) => {
    try {
      console.log("studentid", studentId)
      const response = await fetch(`https://mybuddy-backend.onrender.com/api/fees/history/${studentId}`);
      const data = await response.json();
      console.log("fee", data)
      if (!data.success) throw new Error(data.message);
      return data.history;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Razorpay पेमेंट प्रोसेस करने का API Call
export const processPayment = createAsyncThunk(
  "fees/processPayment",
  async ({ studentId, amount }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://mybuddy-backend.onrender.com/api/fees/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, amount }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feeSlice = createSlice({
  name: "fees",
  initialState: { feeHistory: [], loading: false, error: null, paymentStatus: null },
  reducers: {
    resetPaymentStatus: (state) => { state.paymentStatus = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeHistory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFeeHistory.fulfilled, (state, action) => { state.loading = false; state.feeHistory = action.payload; })
      .addCase(fetchFeeHistory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(processPayment.pending, (state) => { state.paymentStatus = "processing"; })
      .addCase(processPayment.fulfilled, (state) => { state.paymentStatus = "success"; })
      .addCase(processPayment.rejected, (state, action) => { state.paymentStatus = "failed"; state.error = action.payload; });
  },
});

export const { resetPaymentStatus } = feeSlice.actions;
export default feeSlice.reducer;
