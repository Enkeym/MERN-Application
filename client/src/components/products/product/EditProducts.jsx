import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useEditProductMutation, useProductByIdQuery} from '../../../app/services/productsApi';
import Loader from '../../loader/Loader';
import {Button, Container, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import FormOption from '../../../ui/form/FormOption';
import FormInput from '../../../ui/form/FormInput';


const EditProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {data, isLoading} = useProductByIdQuery(params.id || '');
  const [edit] = useEditProductMutation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');


  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
      setCategoryId(data.categoryId);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to='/products' />;
  }


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

      await edit(editedProduct).unwrap();
      toast.success('Product successfully edited!');

      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
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
