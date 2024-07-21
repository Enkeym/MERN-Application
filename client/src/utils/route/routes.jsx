import Login from '../../pages/Login'; // Импортируем компонент Login из указанного пути
import NoteFound from '../../pages/NoteFound'; // Импортируем компонент NoteFound из указанного пути
import Profile from '../../pages/Profile'; // Импортируем компонент Profile из указанного пути
import Register from '../../pages/Register'; // Импортируем компонент Register из указанного пути
import EditProducts from '../../components/products/product/EditProducts'; // Импортируем компонент EditProducts из указанного пути
import MyProducts from '../../pages/MyProducts'; // Импортируем компонент MyProducts из указанного пути
import ProductDetails from '../../pages/ProductDetails'; // Импортируем компонент ProductDetails из указанного пути
import AllProducts from '../../components/products/product/AllProducts'; // Импортируем компонент AllProducts из указанного пути
import Orders from '../../pages/Orders';

// Массив объектов маршрутов для всех пользователей
export const routes = [
  /* Products */
  {link: '/products', component: <AllProducts />}, // Маршрут для страницы всех продуктов
  {link: '/products/:id', component: <ProductDetails />}, // Маршрут для страницы деталей продукта

  /* User */
  {link: '/login', component: <Login />}, // Маршрут для страницы входа в систему
  {link: '/register', component: <Register />}, // Маршрут для страницы регистрации

  /* Page */
  {link: '*', component: <NoteFound />} // Маршрут для всех остальных страниц (страница не найдена)
];

// Массив объектов маршрутов для авторизованных пользователей
export const privateRoutes = [
  /* User */
  {link: '/profile', component: <Profile />}, // Маршрут для страницы профиля пользователя

  /* Products */
  {link: '/products/my', component: <MyProducts />}, // Маршрут для страницы моих продуктов
  {link: '/products/edit/:id', component: <EditProducts />},// Маршрут для страницы редактирования продукта

  /* Orders */
  {link: '/orders', component: <Orders />}, // Маршрут для страницы заказов
];
