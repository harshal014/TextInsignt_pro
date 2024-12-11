import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileData: null,
};

const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    setFileData1: (state, action) => {
      state.fileData = action.payload;
    },
  },
});

export const { setFileData1 } = fileDataSlice.actions;
export default fileDataSlice.reducer;