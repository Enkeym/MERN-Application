import {useEffect} from "react"
import {Col, ListGroup, Row} from "react-bootstrap"
import {useGetCartQuery} from "../app/services/cartApi"
import Layout from "../components/layout/Layout"
import {toast} from "react-toastify"
import Loader from "../components/loader/Loader"
import AddOrder from "../components/order/AddOrder"
import RemoveFromCart from "../components/cart/RemoveFromCart"
import QuantitySelector from "../components/cart/QuantitySelector"

const Cart = () => {

  const {data: cartItems, isLoading, isError} = useGetCartQuery()

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load cart")
    }
  }, [isError])


  if (isLoading) {
    return <Loader />
  }

  return (
    <Layout>
      <h1>Shopping Cart</h1>
      {cartItems?.length === 0 ? (<p>Your cart is empty.</p>) : (<>
        <ListGroup>
          {cartItems?.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.product.name}</h5>
                <QuantitySelector item={item} />
                <p>Price: ${item.total.toFixed(2)}</p>
              </div>
              <RemoveFromCart item={item} />
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Row className="py-3">
          <Col>
            <AddOrder />
          </Col>
        </Row>
      </>
      )}
    </Layout>
  )
}

export default Cart