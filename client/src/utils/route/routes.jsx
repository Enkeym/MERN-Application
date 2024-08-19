import Login from '../../pages/Login';
import NoteFound from '../../pages/NoteFound';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';
import EditProducts from '../../components/products/product/EditProducts';
import MyProducts from '../../pages/MyProducts'; 
import ProductDetails from '../../pages/ProductDetails'; 
import AllProducts from '../../components/products/product/AllProducts';
import Orders from '../../pages/Orders';
import Cart from '../../pages/Cart';

/* Общие маршруты */
export const routes = [
  /* Products */
  {link: '/products', component: <AllProducts />}, 
  {link: '/products/:id', component: <ProductDetails />}, 

  /* User */
  {link: '/login', component: <Login />}, 
  {link: '/register', component: <Register />}, 

  /* Page */
  {link: '*', component: <NoteFound />}, 
];

/* Приветные маршруты */
export const privateRoutes = [
  /* User */
  {link: '/profile', component: <Profile />},

  /* Products */
  {link: '/products/my', component: <MyProducts />}, 
  {link: '/products/edit/:id', component: <EditProducts />},

  /* Orders */
  {link: '/orders', component: <Orders />}, 

  /* Cart */
  {link: '/cart', component: <Cart />}
];
