
import { Box, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion'
import LoginForm from '../../components/partials/login/LoginForm';
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        email: '',
        password: ''
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

    if (user) {
        return <Navigate to="/" />
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await login(values.email, values.password);

            toast({
                title: "Login Successful",
                position: 'bottom',
                description: "You have successfully logged in",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            navigate("/");

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

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
            <LoginForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                loading={loading}
                error={error}
            />
        </Box >
    )
}

export default Login;
