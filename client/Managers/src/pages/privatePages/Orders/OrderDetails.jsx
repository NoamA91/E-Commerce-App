import useFetchGet from '../../../hooks/useFetchGet';
import OrderDetailsComp from '../../../components/partials/orders/OrderDetailsComp';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const OrderDetails = () => {
    const { order_id } = useParams();
    const [data, loading, error] = useFetchGet(`${import.meta.env.VITE_SERVER_URL}/orders/managers/get-order-by-id/${order_id}`);
    const toast = useToast();

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/orders/managers/delete-order/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.error);
            }

            toast({
                title: 'Order Deleted',
                description: 'The order has been deleted successfully',
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
            })
        }
    }


    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert error={error} />}
            {data &&
                <OrderDetailsComp
                    order={data.order}
                    deleteOrder={deleteOrder}
                />
            }
        </>
    );
};

export default OrderDetails;
