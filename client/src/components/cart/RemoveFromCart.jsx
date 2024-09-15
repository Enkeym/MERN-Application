import {useRemoveFromCartMutation} from '../../app/services/cartApi';
import {toast} from 'react-toastify';
import {Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {removeFromLocalCart} from '../../features/cartSlice';


const RemoveFromCart = ({productId}) => {
  const dispatch = useDispatch();
  const [removeFromCart, {isLoading: isRemoving}] = useRemoveFromCartMutation();

  const removeFromCartHandler = async () => {
    try {
      await removeFromCart(productId).unwrap();
      dispatch(removeFromLocalCart({productId}))
      toast.success('Product removed from cart');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to remove product from cart');
    }
  };

  return (
    <Button variant="danger" onClick={removeFromCartHandler} disabled={isRemoving}>
      {isRemoving ? 'Removing...' : 'Remove'}
    </Button>
  );
};

export default RemoveFromCart;
