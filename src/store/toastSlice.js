import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toast: ""
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload
    },
    removeToast: (state) => {
      state.toast = ''
    }
  }
})

export const { showToast, removeToast } = toastSlice.actions

export default toastSlice.reducer