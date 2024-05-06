import {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAddProductMutation} from '../../../app/services/products';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import FormOption from '../../../ui/form/FormOption';
import FormInput from '../../../ui/form/FormInput';

// Компонент для добавления продукта
const AddProducts = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [addProducts] = useAddProductMutation();
  const navigate = useNavigate();

  // Обработчик открытия модального окна
  const handleShow = () => setShow(true);
  // Обработчик закрытия модального окна
  const handleClose = () => {
    setShow(false);
    // Очистка данных после закрытия модального окна
    setTitle('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategoryId('');
  };

  // Обработчик добавления продукта
  const handleAddProducts = async (e) => {
    e.preventDefault();

    try {
      // Выполнение мутации для добавления продукта
      await addProducts({title, price, description, image, categoryId}).unwrap();
      toast.success('Product created successfully!');
      handleClose(); // Закрытие модального окна
      navigate('/products/my'); // Переход на страницу со списком продуктов пользователя
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <Button variant='primary' onClick={handleShow} className='m-1'>
        Add Product
      </Button>

      {/* Модальное окно для добавления продукта */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Форма для добавления продукта */}
          <Form onSubmit={handleAddProducts}>
            <FormInput
              name={'Name'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Name'}
              type={'text'}
              required
            />
            <FormInput
              name={'Price'}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={'Price'}
              type={'number'}
              min='0'
              step='0.01'
              required
            />
            <FormInput
              name={'Description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'Description'}
              type={'text'}
              required
            />
            <FormInput
              name={'Image'}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder={'Image as URL'}
              type={'text'}
              required
            />
            <FormOption
              name={'Category'}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              initialName={categoryId}
              required
            />
            {/* Кнопка для добавления продукта */}
            <Button type='submit' variant='primary' className='me-2'>
              Add
            </Button>
            {/* Кнопка для закрытия модального окна */}
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProducts;
