import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
  // Используем хук useSelector для извлечения информации о пользователе из Redux хранилища
  const {userInfo} = useSelector((state) => state.auth);

  // Проверяем, авторизован ли пользователь
  // Если пользователь авторизован, отображаем дочерние маршруты (Outlet)
  // Если пользователь не авторизован, перенаправляем его на страницу входа (/login) с заменой текущей записи в истории
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;