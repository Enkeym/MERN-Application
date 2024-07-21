import { useDispatch, useSelector } from 'react-redux'
import { setSelectedOrder } from '../../features/ordersSlice'
import { useRemoveOrdersMutation } from '../../app/services/orders'
import { Button, ListGroup } from 'react-bootstrap'

const OrdersList = ({ data: orders }) => {
  const [deleteOrder] = useRemoveOrdersMutation()
  const selectedOrder = useSelector((state) => state.orders.selectedOrder)
  const dispatch = useDispatch()

  const handleSelectOrder = (order) => {
    dispatch(setSelectedOrder(order))
  }

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id)
      dispatch(deleteOrder(id))
    } catch (err) {
      console.error('Failed to delete the order:', err)
    }
  }

  return (
    <ListGroup>
      {orders.map((order) => (
        <ListGroup.Item key={order.id} onClick={() => handleSelectOrder(order)}>
          {order.productId} - {order.quantity} - {order.total}
          <Button variant='danger' onClick={() => handleDeleteOrder(order.id)}>
            Canceled
          </Button>
          {selectedOrder && selectedOrder.id === order.id && (
            <span> (Selected)</span>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default OrdersList
