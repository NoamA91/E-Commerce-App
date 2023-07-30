import { Box, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import RegisterForm from '../../components/register/RegisterForm'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, register } = useContext(AuthContext);
    const toast = useToast();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        phone_number: ""
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setError(null);
    }, [values]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);

            if (values.password !== values.password_confirm) {
                throw new Error("Passwords must match.");
            }

            await register(values);

            toast({
                title: "Account created successfully",
                description: "You can now login",
                status: "success",
                duration: 5000,
                isClosable: true
            })

            navigate("/login");

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return <Navigate to="/" />;
    }


    return (
        <Box
            as={motion.div}
            bg='gray.100'
            w='100%'
            h='100%'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <RegisterForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                loading={loading}
                error={error}
            />
        </Box >
    )
}

export default Register
