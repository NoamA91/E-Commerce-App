import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/ErrorAlert'
import { useEffect } from 'react'
import axios from 'axios'

const ChangePassword = ({ user }) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleShowPass = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        old_password: '',
        new_password: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/change-password/${user._id}`,
                values
            )

            setError(null);
            setValues({
                old_password: '',
                new_password: '',
            });

            navigate('/profile');

            toast({
                title: 'Password changed successfully',
                description: 'Your password has been changed successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            if (error.response.data.error) {
                setError({ message: error.response.data.error })
            } else {
                setError(error.response.data);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Flex
                minH={{ base: '90vh', md: '85vh' }}
                justifyContent='center'
                bg='gray.100'
            >

                <Flex
                    as={motion.div}
                    flexDir='column'
                    w={{ base: '90%', md: '35%' }}
                    h='100%'
                    mt={100}
                    initial={{ opacity: 0, delayChildren: 0.3 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Heading
                        textAlign='center'
                        size='lg'
                    >
                        Change Password
                    </Heading>
                    <Link
                        to='/profile'
                    >
                        <Button
                            leftIcon={<ArrowBackIcon />}
                        >
                            Back
                        </Button>
                    </Link>


                    <Box
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        h='100%'
                        w='100%'
                        p={5}
                        border='1px solid black'
                        borderRadius='lg'
                    >
                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span'>
                                Enter your current password:
                            </Text>
                            <Input
                                type='password'
                                name='old_password'
                                value={values.old_password}
                                onChange={handleChange}
                                variant='flushed'
                                focusBorderColor='teal'
                                size={{ base: 'md', md: 'lg' }}
                                bg='gray.200'
                                isRequired
                            />
                        </Flex>
                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span'>
                                Enter your new password:
                            </Text>
                            <InputGroup>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    name='new_password'
                                    value={values.new_password}
                                    onChange={handleChange}
                                    variant='flushed'
                                    focusBorderColor='teal'
                                    size={{ base: 'md', md: 'lg' }}
                                    bg='gray.200'
                                    mb={3}
                                    isRequired
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={handleShowPass}
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>

                        {error && !loading &&
                            <Box
                                as={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                w='100%'
                            >
                                <ErrorAlert error={error} />
                            </Box>
                        }

                        <Divider colorScheme='black' />

                        <Button
                            colorScheme='teal'
                            variant='solid'
                            mt={5}
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Flex>
            </Flex >
        </>
    )
}

export default ChangePassword
