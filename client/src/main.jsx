import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Home from './pages/Home.jsx'
import {Provider} from 'react-redux'
import store from './app/store.js'
import PrivateRoute from './utils/route/PrivateRoute.jsx'
import {privateRoutes, routes} from './utils/route/routes.jsx'

// Создаем экземпляр BrowserRouter
const router = createBrowserRouter(
  // Создаем маршруты из элементов JSX
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Перенаправление с корневого URL на /products */}
      <Route index element={<Navigate to="/products" />} />

      {/* Общедоступные маршруты */}
      <Route path='products' element={<Home />} />
      {routes.map((route) => (
        <Route
          key={route.link}
          path={route.link}
          element={route.component}
        />
      ))}

      {/* Приватные маршруты */}
      <Route path='' element={<PrivateRoute />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.link}
            path={route.link}
            element={route.component}
          />
        ))}
      </Route>
    </Route>
  )
);

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Оборачиваем приложение в провайдер Redux и React Router */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
