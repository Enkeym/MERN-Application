import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import authSlice from '../features/authSlice'
import productsSlice from '../features/productsSlice'
import ordersSlice from '../features/ordersSlice'
import cartSlice from '../features/cartSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    products: productsSlice,
    orders: ordersSlice,
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true
})

export default store
