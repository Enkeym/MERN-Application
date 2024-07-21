import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: localStorage.getItem('Orders')
    ? JSON.parse(localStorage.getItem('Orders'))
    : [],
  selectedOrder: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
      localStorage.setItem('Orders', JSON.stringify(action.payload))
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload
    },
  }
})

export const { setOrders, setSelectedOrder, setError } = ordersSlice.actions

export default ordersSlice.reducer
