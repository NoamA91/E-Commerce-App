import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Heading,
    useToast,
    InputRightElement,
    InputGroup,
    Image,
} from '@chakra-ui/react'
import { FiEye, FiEyeOff } from "react-icons/fi"
import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const LoginForm = () => {
    const { login } = useContext(AuthContext.AuthContext);

    const toast = useToast()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(() => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(
                values.email,
                values.password
            );

            if (!response.success) {
                throw new Error(response.message);
            }

            toast({
                title: 'Login Successful',
                description: "You are now logged in",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Flex justify='center' align='center' minH='100vh' w='100%'>

            <Box as='form' w={500} bg='whiteAlpha.500' borderRadius='10px' px={10} onSubmit={handleSubmit}>

                <Flex justify='center' align='center' mt={5} >
                    <Image
                        src='/Logo.png'
                        alt='logo'
                        w='100%'
                        borderRadius={10}
                        shadow='lg'
                    />
                </Flex>

                <Box>
                    <Heading as='h2' size='md' textAlign='center' mt={15}>MANAGEMENT</Heading>

                    <FormControl id='email' mt={4} isRequired >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            name="email"
                            bg='whiteAlpha.700'
                            onChange={handleChange}
                            ype="email"
                            placeholder='name@example.com'
                            shadow='inner'
                        />
                    </FormControl >

                    <FormControl id='password' mt={5} isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                            <Input
                                name="password"
                                bg='whiteAlpha.700'
                                onChange={handleChange}
                                type={show ? 'text' : 'password'}
                                placeholder='Enter your password'
                                shadow='inner'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button
                                    size='lg'
                                    bg='inherit'
                                    onClick={() => setShow(!show)}
                                    _hover={{ bg: 'inherit' }}
                                >
                                    {show ? <FiEyeOff /> : <FiEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme={loading ? 'gray' : 'blue'}
                        w='100%'
                        mt={10} mb={10}
                        isLoading={loading}
                    >
                        Log in
                    </Button>
                </Box>
            </Box >
        </Flex >
    )
}

export default LoginForm