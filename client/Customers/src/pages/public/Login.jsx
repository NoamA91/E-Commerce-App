
import { Box, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion'
import LoginForm from '../../components/partials/Login/LoginForm';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [error, setError] = useState(false);

    if (user) {
        return <Navigate to="/" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(values.email, values.password);

            toast({
                title: "Login Successful",
                description: "You have successfully logged in",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            navigate("/");

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                    loading={loading}
                    error={error}
                />
            </Box >

        </>
    )
}

export default Login;
