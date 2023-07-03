import useFetchGet from "../../../hooks/useFetchGet"
import OrdersTable from "../../../components/partials/orders/OrdersTable"
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const orders_url = "http://localhost:3000/orders/managers/all"

const Orders = () => {
  return (
    <div>Orders</div>
  )
}

export default Orders