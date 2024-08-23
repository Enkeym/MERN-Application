import {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useAddProductMutation} from '../../../app/services/productsApi';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import FormOption from '../../../ui/form/FormOption';
import FormInput from '../../../ui/form/FormInput';
import FileInput from '../../../ui/form/FileInput';


const AddProducts = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [addProducts] = useAddProductMutation();
  const navigate = useNavigate();


  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);

    setTitle('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategoryId('');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleAddProducts = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('categoryId', categoryId)

      if (image) {
        formData.append('image', image)
      }

      await addProducts(formData).unwrap();
      toast.success('Product created successfully!');
      handleClose();
      navigate('/products/my');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow} className='m-1'>
        Add Product
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>

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
            <FileInput
              name={'Image'}
              onChange={handleImageChange}
              required
            />
            <FormOption
              name={'Category'}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              initialName={categoryId}
              required
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

export default AddProducts;
