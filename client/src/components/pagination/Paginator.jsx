import {Pagination} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setPage} from '../../features/productSlice';

// Компонент для отображения пагинации
const Paginator = ({totalPages}) => {
  // Получение текущей страницы из хранилища состояния
  const {currentPage} = useSelector((state) => state.product);

  const dispatch = useDispatch(); // Хук для диспетчера Redux

  // Обработчик изменения страницы
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber)); // Вызов экшена для установки текущей страницы
  };

  // Формирование элементов пагинации
  const getPageItems = () => {
    const items = [];
    for (let number = 1;number <= totalPages;number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage} // Установка активной страницы
          onClick={() => handlePageChange(number)} // Обработчик клика по странице
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  // Возвращение компонента пагинации
  return (
    <Pagination>
      {/* Кнопка перехода к предыдущей странице */}
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)} // Обработчик клика по кнопке
        disabled={currentPage === 1} // Отключение кнопки, если текущая страница первая
      />
      {/* Элементы пагинации */}
      {getPageItems()}
      {/* Кнопка перехода к следующей странице */}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)} // Обработчик клика по кнопке
        disabled={currentPage === totalPages} // Отключение кнопки, если текущая страница последняя
      />
    </Pagination>
  );
};

export default Paginator;
