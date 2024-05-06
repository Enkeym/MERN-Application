import { createSlice } from '@reduxjs/toolkit'

// Начальное состояние хранилища
const initialState = {
  // Продукты из локального хранилища или null, если их нет
  products: localStorage.getItem('Products')
    ? JSON.parse(localStorage.getItem('Products'))
    : null,
  // Имя для поиска
  searchName: '',
  // Имя категории
  categoryName: '',
  // Текущая страница
  currentPage: 1,
  // Размер страницы
  currentPageSize: 2
}

// Создание среза для управления состоянием продуктов
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Добавление продукта
    addProduct: (state, action) => {
      state.products = action.payload
      // Сохранение продуктов в локальное хранилище
      localStorage.setItem('Products', JSON.stringify(action.payload))
    },
    // Выход из учетной записи
    logout: (state) => {
      state.products = null
      // Удаление продуктов из локального хранилища
      localStorage.removeItem('Products')
    },
    // Установка имени для поиска
    searchName: (state, action) => {
      state.searchName = action.payload
    },
    // Изменение категории
    changeCategory: (state, action) => {
      state.categoryName = action.payload
    },
    // Установка текущей страницы
    setPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

// Экспорт действий и редюсера
export const { addProduct, logout, searchName, changeCategory, setPage } =
  productSlice.actions

export default productSlice.reducer
