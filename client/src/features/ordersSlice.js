import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: localStorage.getItem('Orders')
    ? JSON.parse(localStorage.getItem('Orders'))
    : [],
  selectedOrder: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
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
    addOrder: (state, action) => {
      state.orders.push(action.payload)
      localStorage.setItem('Orders', JSON.stringify(state.orders))
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      )
      localStorage.setItem('Orders', JSON.stringify(state.orders))
    },
    setOrdersStatus: (state, action) => {
      state.status = action.payload
    },
    setOrdersError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setOrders,
  setSelectedOrder,
  addOrder,
  removeOrder,
  setOrdersStatus,
  setOrdersError
} = ordersSlice.actions
export default ordersSlice.reducer
