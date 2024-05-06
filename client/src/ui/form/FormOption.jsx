import {Form} from 'react-bootstrap';
import {useGetCategoryQuery} from '../../app/services/category';
import Loader from '../../components/loader/Loader';

// Компонент для отображения выпадающего списка с категориями
const FormOption = ({value, onChange, name = false}) => {
  // Получаем данные о категориях с помощью запроса useGetCategoryQuery
  const {data: categories = [], isLoading} = useGetCategoryQuery();

  // Если данные загружаются, показываем загрузчик
  // eslint-disable-next-line react/prop-types
  {
    isLoading && <Loader />;
  }

  return (
    <Form.Group className='mb-3'>
      {/* Выводим название категории */}
      <Form.Label>{name}</Form.Label>
      {/* Создаем выпадающий список */}
      <Form.Select value={value} onChange={onChange} required>
        {/* Добавляем первый пункт, который говорит пользователю выбрать категорию */}
        <option value=''>select category</option>
        {/* Маппим категории и создаем для каждой из них опцию в выпадающем списке */}
        {categories.map((category) => {
          const {id, slug, name: categoryName} = category;
          return (
            <option key={id} value={slug}>
              {categoryName}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};

export default FormOption;
