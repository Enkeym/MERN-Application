import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import Loader from '../components/loader/Loader';
import {Button, Card, Container} from 'react-bootstrap';
import {useProductByIdQuery, useRemoveProductMutation} from '../app/services/productsApi';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import AddToCartButton from '../components/cart/AddToCart';
import QuantitySelector from '../components/cart/QuantitySelector';
import {setPage} from '../features/productsSlice';

const ProductDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data, isLoading, isError} = useProductByIdQuery(id);
  const [remove] = useRemoveProductMutation();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);
  const {items: cartItems = []} = useSelector((state) => state.cart);

  if (isLoading) return <Loader />;
  if (isError || !data) return <Navigate to='/' />;

  const {image, title, price, description, userId} = data;

  const cartItem = cartItems.find(item => item.productId === id);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await remove(id).unwrap()
      toast.success('Successfully deleted!');
      dispatch(setPage(1))
      navigate('/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center gap-5 py-5'>
      <Card style={{width: '25rem'}}>
        <Card.Img variant='top' src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{price}<span>&#36;</span></Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          {userInfo && userInfo.id === userId ? (
            <>
              <Link to={`/products/edit/${id}`}>
                <Button variant='secondary' className='me-2'>
                  Edit
                </Button>
              </Link>
              <Button onClick={handleDelete} variant='danger'>
                Delete
              </Button>
            </>
          ) : (
            cartItem ? <QuantitySelector item={cartItem} /> : <AddToCartButton product={data} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;