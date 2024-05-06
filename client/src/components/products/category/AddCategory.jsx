import {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAddCategoriesMutation} from '../../../app/services/category';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import FormInput from '../../../ui/form/FormInput';

// Компонент для добавления новой категории
const AddCategory = () => {
  const [show, setShow] = useState(false); // Состояние для отображения модального окна
  const handleClose = () => setShow(false); // Функция для закрытия модального окна
  const handleShow = () => setShow(true); // Функция для открытия модального окна

  const [name, setName] = useState(''); // Состояние для имени категории
  const [slug, setSlug] = useState(''); // Состояние для формирования slug категории

  useEffect(() => {
    setSlug(name.toLowerCase()); // Формирование slug на основе имени категории
  }, [name]);

  const [addCategories] = useAddCategoriesMutation(); // Хук для добавления категории
  const navigate = useNavigate(); // Хук для навигации

  // Обработчик добавления новой категории
  const handleAddProducts = async (e) => {
    e.preventDefault();

    try {
      await addCategories({name, slug}).unwrap(); // Вызов мутации для добавления категории
      toast.success('Created successfully!'); // Уведомление об успешном создании категории
      handleClose(); // Закрытие модального окна
      setName(''); // Сброс значения имени категории
      navigate('/products/my'); // Навигация на страницу продуктов
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Уведомление об ошибке при добавлении категории
    }
  };

  // Возвращение компонента для добавления категории
  return (
    <>
      <Button variant='success' onClick={handleShow} className='m-1'>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProducts}>
            <FormInput
              name='Category name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern='[a-zA-Z]*'
              title='Only latin letters'
              type='text'
              placeholder='name'
            />

            <Button type='submit' variant='primary' className='me-2'>
              Add
            </Button>

            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategory;
