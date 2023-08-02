import { useContext, useState } from "react";
import CheckoutStepper from "../../components/partials/checkout/CheckoutStepper"
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useToast } from "@chakra-ui/react";


const Checkout = ({ user }) => {
    const toast = useToast();
    const [error, setError] = useState(null);
    const { cartItems, setCartItems } = useContext(CartContext);
    const [payment, setPayment] = useState(null);
    const [paymentsValues, setPaymentValues] = useState({
        credit: "",
        exp: "",
        cvv: "",
    });

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
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/payments/pay`,
                { credit_number: paymentsValues.credit }
            );

            setPayment(data);
            placeOrder();

        } catch (error) {
            setError(error);
        }
    };

    const placeOrder = async () => {
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
                }
            );

            setCartItems([]);

        } catch (error) {

        }
    };



    return (
        <CheckoutStepper
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