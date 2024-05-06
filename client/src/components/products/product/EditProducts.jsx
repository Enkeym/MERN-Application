import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useEditProductMutation, useProductByIdQuery} from '../../../app/services/products';
import Loader from '../../loader/Loader';
import {Button, Container, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import FormOption from '../../../ui/form/FormOption';
import FormInput from '../../../ui/form/FormInput';

// Компонент для редактирования продукта
const EditProducts = () => {
  const navigate = useNavigate(); // Хук для перехода на другие страницы
  const params = useParams(); // Получение параметров из URL
  const {data, isLoading} = useProductByIdQuery(params.id || ''); // Получение данных о продукте по его ID
  const [edit] = useEditProductMutation(); // Хук для выполнения мутации редактирования продукта

  const [title, setTitle] = useState(''); // Состояние заголовка продукта
  const [price, setPrice] = useState(''); // Состояние цены продукта
  const [description, setDescription] = useState(''); // Состояние описания продукта
  const [image, setImage] = useState(''); // Состояние изображения продукта
  const [categoryId, setCategoryId] = useState(''); // Состояние категории продукта

  // Обновление состояний при получении данных о продукте
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
      setCategoryId(data.categoryId);
    }
  }, [data]);

  // Отображение загрузчика при загрузке данных
  if (isLoading) {
    return <Loader />;
  }

  // Переход на страницу со списком продуктов, если данные не найдены
  if (!data) {
    return <Navigate to='/products' />;
  }

  // Обработчик редактирования продукта
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const editedProduct = {
        ...data,
        title,
        price,
        description,
        image,
      };

      await edit(editedProduct).unwrap(); // Выполнение мутации редактирования продукта
      toast.success('Product successfully edited!'); // Вывод уведомления об успешном редактировании
      // Очистка состояний
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategoryId('');
      navigate('/products'); // Переход на страницу со списком продуктов
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Вывод ошибки, если возникла
    }
  };

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      {/* Форма редактирования продукта */}
      <Form onSubmit={handleEdit} style={{width: '25rem'}}>
        <FormInput
          name='Name'
          type='text'
          placeholder='Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormInput
          name='Price'
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min='0'
          step='0.01'
          required
        />

        <FormInput
          name='Description'
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormInput
          name='Image'
          type='text'
          placeholder='Image as URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <FormOption
          name='Category'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <Button type='submit' variant='primary' className='me-2'>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditProducts;
