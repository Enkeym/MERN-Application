import {useRemoveFromCartMutation} from '../../app/services/cartApi'
import {toast} from 'react-toastify'
import {Button} from 'react-bootstrap'

const RemoveFromCart = ({item}) => {

  const [removeFromCart, {isLoading: isRemoving}] = useRemoveFromCartMutation()

  const removeFromCartHandler = async (productId) => {
    try {
      await removeFromCart(productId).unwrap()
      
      toast.success('Product removed from cart')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to remove from cart')
    }
  }

  return (
    <Button variant="danger" onClick={() => removeFromCartHandler(item.productId)} disabled={isRemoving}>
      {isRemoving ? 'Removing...' : 'Remove'}
    </Button>
  )
}

export default RemoveFromCart