import { createSlice } from '@reduxjs/toolkit'

// Начальное состояние хранилища для авторизации
const initialState = {
  // Информация о пользователе из локального хранилища или null, если ее нет
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
}

// Создание среза для управления состоянием авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Установка учетных данных пользователя
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      // Сохранение информации о пользователе в локальное хранилище
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    // Выход из учетной записи
    logout: (state) => {
      state.userInfo = null
      // Удаление информации о пользователе из локального хранилища
      localStorage.removeItem('userInfo')
    }
  }
})

// Экспорт действий и редюсера
export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
