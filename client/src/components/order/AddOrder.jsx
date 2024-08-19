import {useEffect, useState} from "react"
import {Alert, Button} from "react-bootstrap"
import {useAddOrdersMutation} from "../../app/services/ordersApi"
import Loader from "../loader/Loader"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {clearCart, setCartError, setCartStatus} from "../../features/cartSlice"


const AddOrder = () => {
  const [addOrders, {isLoading, error}] = useAddOrdersMutation()
  const [orderDetails, setOrderDetails] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.items)
  const userInfo = useSelector(state => state.auth.userInfo)

  useEffect(() => {
    if (cartItems.length > 0 && userInfo) {
      const newOrder = {
        productsOnOrder: cartItems.map(item => ({productId: item.productId, quantity: item.quantity, total: item.total})),
        userId: userInfo.id,
        status: 'Pending'
      }
      setOrderDetails(newOrder)
    }
  }, [cartItems, userInfo])

  const orderSubmit = async () => {
    if (orderDetails) {
      dispatch(setCartStatus('loading'))
      try {
        await addOrders(orderDetails).unwrap()
        dispatch(setCartStatus('success'))
        dispatch(clearCart())
        navigate('/orders')
      } catch (err) {
        dispatch(setCartStatus('failed'))
        dispatch(setCartError(err?.data?.message || 'Failed to add order'))
      }
    } else {
      dispatch(setCartError('Order details are missing'))
    }
  }

  return (
    <div>
      {isLoading && <Loader />}
      {error && <Alert variant='danger'>{error.data.message || 'An error occurred'}</Alert>}
      <Button variant='primary' onClick={orderSubmit} className='w-100' disabled={isLoading}>Proceed to Checkout</Button>
    </div>
  )
}


export default AddOrder