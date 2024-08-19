import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: localStorage.getItem('CartItems')
    ? JSON.parse(localStorage.getItem('CartItems'))
    : [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
      localStorage.setItem('CartItems', JSON.stringify(action.payload))
    },
    addToCart: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      )
      if (item) {
        item.quantity += action.payload.quantity
        item.total = item.quantity * item.price
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem('CartItems', JSON.stringify(state.items))
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      )
      localStorage.setItem('CartItems', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('CartItems')
    },
    setCartStatus: (state, action) => {
      state.status = action.payload
    },
    setCartError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  setCartStatus,
  setCartError
} = cartSlice.actions
export default cartSlice.reducer
