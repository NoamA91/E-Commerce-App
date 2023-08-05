import { useContext, useState } from "react";
import CheckoutForm from "../../components/partials/checkout/CheckoutForm"
import axios, { CancelToken, isCancel } from "axios";
import { CartContext } from "../../context/CartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Checkout = ({ user }) => {
    const navigate = useNavigate();
    const cancelSource = CancelToken.source();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const [paymentsValues, setPaymentValues] = useState({
        credit_number: "",
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
                { credit_number: paymentsValues.credit_number },
                { cancelToken: cancelSource.token }
            );

            placeOrder(data);

        } catch (error) {
            if (isCancel(error)) {
                console.log('Request cancelled');
            } else {
                setError(error.response.data);
            }
            setLoading(false);
        }
    };

    const placeOrder = async (paymentData) => {
        setLoading(true)
        setError(null);

        try {
            const data = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/orders/add-order`,
                {
                    userId: user?._id,
                    phone_number: values.phone_number,
                    address: {
                        city: values.address.city,
                        street: values.address.street,
                        building: values.address.building,
                        apartment: values.address.apartment,
                    },
                    payment_details: {
                        terminal_number: paymentData.terminal_number,
                        transaction_number: paymentData.transaction_number,
                        last_digits: paymentData.last_digits,
                    },
                    order_items: cart.map((item) => {
                        return {
                            productId: item._id,
                            price: item.price,
                            quantity: item.quantity,
                        };
                    }),
                    shipping_fee: 0.00
                },
                { cancelToken: cancelSource.token }
            );
            setCart([]);
            navigate('/order-completed');

        } catch (error) {
            if (isCancel(error)) {
                console.log('Request cancelled');
            } else {
                setError(error);
            }
        }
        setLoading(false);
    };

    return (
        <CheckoutForm
            values={values}
            paymentsValues={paymentsValues}
            setPaymentValues={setPaymentValues}
            HandlePayment={HandlePayment}
            error={error}
            handleChange={handleChange}
            loading={loading}
        />
    )
}

export default Checkout