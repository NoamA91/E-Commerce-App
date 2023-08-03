import { useContext, useState } from "react";
import CheckoutForm from "../../components/partials/checkout/CheckoutForm"
import axios, { CancelToken, isCancel } from "axios";
import { CartContext } from "../../context/CartContext";
import { Modal, ModalContent, ModalOverlay, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";


const Checkout = ({ user }) => {
    const cancelSource = CancelToken.source();
    const toast = useToast();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { cartItems, setCartItems } = useContext(CartContext);
    const [payment, setPayment] = useState(null);
    const [paymentsValues, setPaymentValues] = useState({
        credit: "",
        exp: "",
        cvv: "",
    });

    useEffect(() => {
        return () => {
            // Cancel any ongoing requests when the component unmounts
            cancelSource.cancel();
        };
    }, []);

    const [values, setValues] = useState({
        username: user?.username,
        email: user?.email,
        phone_number: user?.phone_number || '',
        address: user?.address ? {
            city: user.address?.city || '',
            street: user.address?.street || '',
            building: user.address?.building || '',
            apartment: user.address?.apartment || '',
        } : {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            // Update nested address values
            const addressField = name.split('.')[1];
            setValues((prevValues) => ({
                ...prevValues,
                address: {
                    ...prevValues.address,
                    [addressField]: value,
                },
            }));
        } else {
            // Update other values
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const HandlePayment = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/payments/pay`,
                { credit_number: paymentsValues.credit },
                { cancelToken: cancelSource.token }
            );

            setPayment(data);
            await placeOrder();

        } catch (error) {
            if (isCancel(error)) {
                console.log('Request cancelled');
            } else {
                setError(error);
            }
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/orders/add-order`,
                {
                    user: user?._id,
                    address: {
                        city: values.city,
                        street: values.street,
                        building: values.building,
                    },
                    payment_details: {
                        terminal_number: payment.terminal_number,
                        transaction_number: payment.transaction_number,
                        last_digits: payment.last_digits,
                    },
                    products: cartItems.map((pr) => {
                        return {
                            product: pr._id,
                            RTP: pr.product_price,
                            quantity: pr.quantity,
                        };
                    }),
                },
                { cancelToken: cancelSource.token }
            );

            setCartItems([]);

        } catch (error) {
            if (isCancel(error)) {
                console.log('Request cancelled');
            } else {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <Modal isOpen={loading} isCentered>
                <ModalOverlay />
                <ModalContent
                    w='100px'
                    h='100px'
                >
                    <VStack
                        justifyContent='center'
                        alignContent='center'
                    >
                        <Text>Placing your order..</Text>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="ShopTeal.300"
                            size="xl"
                        />
                    </VStack>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <CheckoutForm
            values={values}
            paymentsValues={paymentsValues}
            HandlePayment={HandlePayment}
            setPaymentValues={setPaymentValues}
            payment={payment}
            error={error}
            handleChange={handleChange}
        />
    )
}

export default Checkout