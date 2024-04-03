import Login from '../../pages/Login'
import NoteFound from '../../pages/NoteFound'
import Profile from '../../pages/Profile'
import Register from '../../pages/Register'
import EditProducts from '../../components/products/product/EditProducts'
import MyProducts from '../../pages/MyProducts'
import ProductDetails from '../../pages/ProductDetails'

export const routes = [
  {link: '/login', component: <Login />},
  {link: '/register', component: <Register />},
  {link: '/products/:id', component: <ProductDetails />},
  {link: '*', component: <NoteFound />}
]

export const privateRoutes = [
  {link: '/profile', component: <Profile />},
  {link: '/products/my', component: <MyProducts />},
  {link: '/products/edit/:id', component: <EditProducts />}
]
