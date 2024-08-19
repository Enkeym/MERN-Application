import {useDispatch, useSelector} from 'react-redux'
import {setSelectedOrder} from '../../features/ordersSlice'
import {useRemoveOrdersMutation} from '../../app/services/ordersApi'
import {Button, ListGroup} from 'react-bootstrap'

const OrdersList = ({data: orders}) => {
  const [deleteOrder] = useRemoveOrdersMutation()
  const selectedOrder = useSelector((state) => state.orders.selectedOrder)
  const dispatch = useDispatch()

  const handleSelectOrder = (order) => {
    dispatch(setSelectedOrder(order))
  }

  const handleDeleteOrder = async (id, e) => {
    e.stopPropagation()

    try {
      await deleteOrder(id).unwrap()

    } catch (err) {
      console.error('Failed to delete the order:', err)
    }
  }

  return (
    <ListGroup>
      {orders.map((order) => (
        <ListGroup.Item
          key={order.id}
          onClick={() => handleSelectOrder(order)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '5px',
            border: selectedOrder && selectedOrder.id === order.id ? '0px solid #007bff' : '1px solid #dee2e6',
          }}
        >
          <div>
            {order.productsInOrder.map((product) => (
              <div key={product.id}>
                Product: {product.product.title}, Quantity: {product.quantity}, Total: ${product.total.toFixed(2)}
              </div>
            ))}
          </div>
          <div>
            <Button variant='danger' onClick={(e) => handleDeleteOrder(order.id, e)}>
              Canceled
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default OrdersList
