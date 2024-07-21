import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeCategory} from '../../../features/productsSlice';
import FormOption from '../../../ui/form/FormOption';

// Компонент для выбора категории продуктов
const SelectCategory = () => {
  const dispatch = useDispatch(); // Хук useDispatch для отправки действий в Redux хранилище
  const [categories, setCategories] = useState(); // Состояние для выбранной категории

  // Обработчик изменения выбранной категории
  const handleChange = (e) => {
    dispatch(changeCategory(e.target.value)); // Отправка действия для изменения категории в Redux хранилище
    setCategories(e.target.value); // Обновление состояния выбранной категории
  };

  // Возвращение компонента формы выбора категории
  return <FormOption value={categories} onChange={handleChange} />;
};

export default SelectCategory;
