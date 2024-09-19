import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useEditProductMutation, useProductByIdQuery} from '../../../app/services/productsApi';
import Loader from '../../loader/Loader';
import {Button, Container, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import FormInput from '../../../ui/forms/FormInput';
import FileInput from '../../../ui/files/FileInput';
import FormOption from '../../../ui/options/FormOption';

const EditProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {data, isLoading} = useProductByIdQuery(params.id || '');
  const [edit] = useEditProductMutation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');


  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setImage(null);
      setCategoryId(data.categoryId);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to='/products' />;
  }


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };



  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('categoryId', categoryId);

    if (image) {
      formData.append('image', image);
    }

    try {
      await edit({id: params.id, formData}).unwrap();
      toast.success('Product successfully edited!');

      setTitle('');
      setPrice('');
      setDescription('');
      setImage(null);
      setCategoryId('');
      navigate('/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>

      <Form onSubmit={handleEdit} style={{width: '25rem'}}>
        <FormInput
          name='Name'
          type='text'
          placeholder='Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormInput
          name='Price'
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min='0'
          step='0.01'
        />

        <FileInput
          name={'Image'}
          onChange={handleImageChange}
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
