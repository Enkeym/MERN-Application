import { createSlice } from '@reduxjs/toolkit'

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem('CartItems', JSON.stringify(items))
  } catch (error) {
    console.log('Error saving cart items to local storage:', error)
  }
}

const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('CartItems')
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.log('Error loading cart items from local storage:', error)
  }
}

const initialState = {
  items: loadCartFromLocalStorage(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
      saveCartToLocalStorage(state.items)
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
      saveCartToLocalStorage(state.items)
    },
    updateCartQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      )
      if (item) {
        item.quantity = action.payload.quantity
        item.total = item.quantity * item.price
      }
      saveCartToLocalStorage(state.items)
    },
    removeFromLocalCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      )
      saveCartToLocalStorage(state.items)
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
  removeFromLocalCart,
  clearCart,
  updateCartQuantity,
  setCartStatus,
  setCartError
} = cartSlice.actions
export default cartSlice.reducer
