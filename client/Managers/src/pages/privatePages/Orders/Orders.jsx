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

  // const changeStatus = async (id, value) => {
  //   try {
  //     const response = await axios.put(
  //       `${url}update-status/${id}`,
  //       { status: value }
  //     );

  //     if (!response.data.success) {
  //       throw new Error(response.data.error);
  //     }

  //     toast.success(response.data.message, {
  //       position: "top-center",
  //       theme: "colored",
  //       autoClose: 1000
  //     });

  //   } catch (error) {
  //     toast.error(error.response.data.error, {
  //       position: "top-center",
  //       theme: "colored",
  //       autoClose: 1000
  //     });
  //   }
  // };

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      {data && <OrdersTable orders={orders} />}
    </>
  )
}

export default Orders