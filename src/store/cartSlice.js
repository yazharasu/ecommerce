import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: []
  },
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    remove:  (state, action) => {
      state.value = [...state.value].filter( item => {
        return item.id !== action.payload.id
      })
    },
    clear: (state) => {
      state.value.length = 0
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const updatedItems = state.value.map(item => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      state.value =  updatedItems;
    },
  }
})

export const { add, remove, clear, setQuantity } = cartSlice.actions

export default cartSlice.reducer