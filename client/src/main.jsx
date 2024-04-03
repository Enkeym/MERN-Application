import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* routes */}
      <Route index={true} path='/' element={<Home />} />
      {routes.map((route) => {
        return (
          <Route
            key={route.component}
            path={route.link}
            element={route.component}
          />
        )
      })}

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='' element={<PrivateRoute />}>
          {privateRoutes.map((route) => {
            return (
              <Route
                key={route.component}
                path={route.link}
                element={route.component}
              />
            )
          })}
        </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
