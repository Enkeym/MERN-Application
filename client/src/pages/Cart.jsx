import {useEffect} from "react";
import {Col, ListGroup, Row, Button} from "react-bootstrap";
import {useGetCartQuery} from "../app/services/cartApi";
import Layout from "../components/layout/Layout";
import {toast} from "react-toastify";
import Loader from "../components/loader/Loader";
import AddOrder from "../components/order/AddOrder";
import RemoveFromCart from "../components/cart/RemoveFromCart";
import QuantitySelector from "../components/cart/QuantitySelector";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const {data: cartItems, isLoading, isError} = useGetCartQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load cart");
    }
  }, [isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <h1>Shopping Cart</h1>
      {cartItems?.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Go to Products
          </Button>
        </>
      ) : (
        <>
          <ListGroup>
            {cartItems?.map((item) => (
              <ListGroup.Item
                key={item.productId}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.product.name}</h5>
                  <QuantitySelector productId={item.productId} />
                  <p>Price: ${item.total.toFixed(2)}</p>
                </div>
                <RemoveFromCart productId={item.productId} />
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
  );
};

export default Cart;