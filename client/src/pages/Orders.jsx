import {useEffect, useState} from "react";
import {useGetOrdersQuery} from "../app/services/orders";
import Layout from "../components/layout/Layout";
import OrdersList from "../components/order/OrdersList";
import Loader from "../components/loader/Loader";
import {toast} from "react-toastify";

//Продумать логику вывода товаров, сделать корзину, сделать вывод массива продуктов в заказе, 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const {data, error, isLoading} = useGetOrdersQuery();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders");
    }
  }, [error]);

  return (
    <Layout>
      <h1>Orders Management</h1>
      {isLoading ? <Loader /> : <OrdersList data={orders} />}
    </Layout>
  );
};

export default Orders;
