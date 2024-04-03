import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import {api} from './services/api'
import productSlice from '../features/productSlice'

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth: authSlice,
		product: productSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
	devTools: true,
})

export default store
