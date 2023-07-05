import useFetchGet from "../../../hooks/useFetchGet"
import OrdersTable from "../../../components/partials/orders/OrdersTable"
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorAlert from "../../../components/ErrorAlert"
import { useEffect } from "react";
import { useState } from "react";

const orders_url = `${import.meta.env.VITE_SERVER_URL}/orders/managers/all`;

const Orders = () => {
  const [data, loading, error] = useFetchGet(orders_url);
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data])

  const changeStatus = async (id, value) => {
    const change_status_url = `${import.meta.env.VITE_SERVER_URL}/orders/managers/update-status/${id}`;
    try {
      const response = await axios.put(
        change_status_url,
        { status: value }
      );

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === id ? { ...order, status: value } : order
        )
      );

      toast({
        title: 'Status Changed',
        description: 'The order status has been changed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      {data && <OrdersTable
        orders={orders}
        changeStatus={changeStatus}
      />}
    </>
  )
}

export default Orders