import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useEditProductMutation, useProductByIdQuery} from '../../../app/services/productsApi';
import Loader from '../../loader/Loader';
import {Container} from 'react-bootstrap';
import {toast} from 'react-toastify';
import FormProduct from '../../../ui/forms/FormProduct';

const EditProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {data, isLoading} = useProductByIdQuery(params.id || '');
  const [editProduct] = useEditProductMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Navigate to='/products' />;
  }

  const handleEditProduct = async (formData) => {
    try {
      await editProduct({id: params.id, formData}).unwrap();
      toast.success('Product successfully edited!');
      navigate('/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      <FormProduct onSubmit={handleEditProduct} initialData={data} />
    </Container>
  );
};

export default EditProducts;
