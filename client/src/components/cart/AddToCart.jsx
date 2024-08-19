import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAddToCartMutation} from '../../app/services/cartApi';
import {addToCart as addToCartRedux} from '../../features/cartSlice';

const AddToCartButton = ({product, variant = 'primary', size = 'lg', className = ''}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth);

  const [addToCart, {isLoading}] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (product) {
      const cartItem = {
        productId: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        total: product.price,
      };

      try {
        await addToCart(cartItem).unwrap();

        dispatch(addToCartRedux(cartItem));

        toast.success('Added to cart!');
      } catch (error) {
        toast.error('Failed to add to cart. Please try again.');
      }
    } else {
      toast.error('Product information is missing.');
    }
  };

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;