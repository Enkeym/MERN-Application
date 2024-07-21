import {useDispatch} from 'react-redux'; // Импорт хука useDispatch для отправки действий в Redux
import {searchName} from '../../../features/productsSlice'; // Импорт action creator для поиска по названию продуктов
import {useEffect, useState} from 'react'; // Импорт хука useEffect для выполнения эффекта после отрисовки компонента и хука useState для управления состоянием
import {FormControl} from 'react-bootstrap'; // Импорт компонента FormControl из библиотеки react-bootstrap для создания поля ввода
import {useDebounce} from '../../../utils/debounce/debounce'; // Импорт кастомного хука useDebounce для создания задержки при изменении значения

const SearchTitle = () => {
  const [search, setSearch] = useState(''); // Состояние для хранения значения поискового запроса
  const debounced = useDebounce(search, 500); // Использование кастомного хука useDebounce для задержки изменения поискового запроса
  const dispatch = useDispatch(); // Получение функции dispatch из хука useDispatch для отправки действия в Redux

  useEffect(() => {
    // Выполнение эффекта при изменении значения debounced или dispatch
    dispatch(searchName(debounced)); // Отправка действия поиска по названию продуктов с задержкой
  }, [dispatch, debounced]); // Зависимости для выполнения эффекта

  return (
    <FormControl
      placeholder='search...' // Задание текста-плейсхолдера для поля ввода
      value={search} // Установка значения поля ввода из состояния search
      onChange={(e) => setSearch(e.target.value)} // Обработчик изменения значения поля ввода для обновления состояния search
    />
  );
}

export default SearchTitle;
