import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isParentMode: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setParentMode: (state, action) => {
      state.isParentMode = action.payload;
    },
  },
});

export const { setParentMode } = settingsSlice.actions;
export default settingsSlice.reducer;
