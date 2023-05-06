import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice';
import toastReducer from './toastSlice';


export default configureStore({
  reducer: {
    cart: cartReducer,
    toast: toastReducer,
  },

})