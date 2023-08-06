import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from "react";
import ErrorAlert from '../../components/ErrorAlert';
import OrdersDetails from '../../components/partials/orders/OrdersDetails';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Helmet } from 'react-helmet';

const Orders = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrdersForUser = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/orders/all/${user._id}`
                );
                setOrders(data.orders);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getOrdersForUser();
    }, []);

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <Box
            w='100%'
            h='100vh'
            bg='gray.100'
        >
            <ErrorAlert error={error} />
        </Box>
    )

    return (
        <>
            <Helmet>
                <title>PetShop | My Orders</title>
                <meta name="description" content="My Orders page" />
            </Helmet>
            <OrdersDetails orders={orders} />
        </>
    )
}

export default Orders