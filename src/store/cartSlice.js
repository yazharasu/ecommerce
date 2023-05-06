import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: []
  },
  reducers: {
    add: (state, action) => {
      state.value = [ ...state.value, action.payload ]
    },
    remove:  (state, action) => {
      state.value = [...state.value].filter( item => {
        return item.id !== action.payload.id
      })
    },
    clear: (state) => {
      state.value.length = 0
    }
  }
})

export const { add, remove, clear } = cartSlice.actions

export default cartSlice.reducer