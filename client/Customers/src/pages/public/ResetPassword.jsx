import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Box, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ResetPasswordForm from '../../components/partials/resetPass/ResetPasswordForm';
import { Helmet } from 'react-helmet';

const ResetPassword = () => {
    const { forgotPassword } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        email: '',
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (values) => {
        setError(null);
        try {
            setLoading(true);
            const response = await forgotPassword(values.email);
            setValues({
                email: '',
            });
            useToast({
                title: response.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>PetShop | Reset Password</title>
                <meta name="description" content="Reset Password page" />
            </Helmet>
            <Box
                as={motion.div}
                bg='gray.100'
                w='100%'
                h='100%'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <ResetPasswordForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                    loading={loading}
                    error={error}
                />
            </Box>
        </>
    )
}

export default ResetPassword