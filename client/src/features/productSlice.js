import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: localStorage.getItem('Products')
    ? JSON.parse(localStorage.getItem('Products'))
    : null,
  searchName: '',
  categoryName: ''
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload
      localStorage.setItem('Products', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.products = null
      localStorage.removeItem('Products')
    },
    searchName: (state, action) => {
      state.searchName = action.payload
    },
    changeCategory: (state, action) => {
      state.categoryName = action.payload
    }
  }
})

export const { addProduct, logout, searchName, changeCategory } =
  productSlice.actions

export default productSlice.reducer
