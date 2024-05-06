import { Outlet } from 'react-router-dom'; // Импортируем Outlet из react-router-dom для рендеринга вложенных маршрутов
import Header from './components/header/Header'; // Импортируем компонент Header из указанного пути
import { Container } from 'react-bootstrap'; // Импортируем компонент Container из react-bootstrap для создания контейнера сетки
import 'react-toastify/dist/ReactToastify.css'; // Импортируем стили для React Toastify
import { ToastContainer } from 'react-toastify'; // Импортируем компонент ToastContainer из react-toastify для отображения уведомлений

const App = () => {
  return (
    <>
      {/* Рендерим компонент Header */}
      <Header />
      {/* Рендерим компонент ToastContainer для отображения уведомлений */}
      <ToastContainer />
      {/* Используем контейнер для центрирования и выравнивания содержимого */}
      <Container className="my-2">
        {/* Outlet используется для рендеринга вложенных маршрутов */}
        <Outlet />
      </Container>
    </>
  );
}

export default App; // Экспортируем компонент App
