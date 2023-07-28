import {
    Box,
    Button,
    FormControl,
    Input,
    VStack,
    Heading,
    InputGroup,
    InputLeftElement,
    Flex,
    Text,
    chakra,
    InputRightElement,
    AbsoluteCenter
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi'
import { useState } from 'react';
import SVG from './SVG';
import ErrorAlert from '../../ErrorAlert';
import { motion } from 'framer-motion';

const LoginForm = ({ handleSubmit, handleChange, values, loading, error }) => {
    const [show, setShow] = useState(false)
    const handleShowPass = () => setShow(!show)
    const CBiSolidUser = chakra(BiSolidUser);
    const CBiSolidLockAlt = chakra(BiSolidLockAlt);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(values);
    };

    return (
        <>
            <Flex
                flexDir={{ base: 'column', md: 'row' }}
                justifyContent={{ md: 'center' }}
                minH={{ base: '80vh', md: '55vh' }}
            >
                <VStack
                    as='form'
                    bg='whiteAlpha.700'
                    spacing={5}
                    w={{ base: '100%', md: '500px' }}
                    h='100%'
                    mt={{ base: 5, md: 120 }}
                    boxShadow={{ md: 'md' }}
                    borderRadius={10}
                    p={5}
                    onSubmit={onSubmit}
                >
                    <Heading
                        as='h2'
                        size='xl'
                    >
                        Login
                    </Heading>
                    <FormControl id='email'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CBiSolidUser
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='email'
                                placeholder='Email Address'
                                focusBorderColor='teal'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                isRequired
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id='password'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CBiSolidLockAlt
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='Password'
                                focusBorderColor='teal'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
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
                    </FormControl>
                    <Text>Forgot Your Password?</Text>
                    <Button
                        colorScheme='teal'
                        size={{ base: 'md', md: 'lg' }}
                        w='100%'
                        loading={loading.toString()}
                        type='submit'
                    >
                        Sign In
                    </Button>
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
                </VStack>

                <Box
                    display={{ base: 'block', md: 'none' }}
                    position='relative'
                    top={3}
                    py={5}
                >
                    <Box width='100%' bg='gray.300' h='1px'></Box>
                    <AbsoluteCenter
                        px='4'
                        fontWeight='bold'
                        bg='gray.100'
                    >
                        OR
                    </AbsoluteCenter>
                </Box>

                <Flex
                    mt={{ base: 5, md: 120 }}
                    h='100%'
                    w={{ base: '100%', md: '400px' }}
                    flexDir='column'
                    pt={{ base: 0, md: 5 }}
                    pl={{ md: 20 }}
                    px={{ base: 5 }}
                    gap={5}
                >
                    <Box
                        display={{ base: 'none', md: 'block' }}
                    >
                        <Heading
                            as='h2'
                            size='xl'
                        >
                            I&apos;m new here
                        </Heading>
                        <Text>
                            Creating an account is easy and only takes a few seconds.
                            You&apos;ll be able to track your orders and view your personal information.
                        </Text>
                    </Box>
                    <Link to='/register'>
                        <Button
                            colorScheme='teal'
                            variant='outline'
                            mt={{ base: 1, md: 0 }}
                            size={{ base: 'md', md: 'lg' }}
                            w='100%'
                        >
                            Register
                        </Button>
                    </Link>
                </Flex>
            </Flex>
            <Box
                bg='gray.100'
                w="100%"
            >
                <SVG />
            </Box>
        </>
    )
}

export default LoginForm


/* import {
    Box,
    Button,
    FormControl,
    Input,
    VStack,
    Heading,
    InputGroup,
    InputLeftElement,
    Flex,
    Text,
    chakra,
    InputRightElement,
    AbsoluteCenter,
    useToast
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi'
import { useContext, useState } from 'react';
import SVG from './SVG';
import ErrorAlert from '../../ErrorAlert';
import { AuthContext } from '../../../context/AuthContext';


const LoginForm = () => {
    const [show, setShow] = useState(false)
    const handleShowPass = () => setShow(!show)
    const CBiSolidUser = chakra(BiSolidUser);
    const CBiSolidLockAlt = chakra(BiSolidLockAlt);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            console.log(error);
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Flex
                flexDir={{ base: 'column', md: 'row' }}
                justifyContent={{ md: 'center' }}
                minH={{ base: '80vh', md: '55vh', lg: '50vh' }}
            >
                <VStack
                    as='form'
                    bg='whiteAlpha.700'
                    spacing={5}
                    w={{ base: '100%', md: '500px' }}
                    h='100%'
                    mt={{ base: 5, md: 120 }}
                    boxShadow={{ md: 'md' }}
                    borderRadius={10}
                    p={5}
                    onSubmit={handleSubmit}
                >
                    <Heading
                        as='h2'
                        size='xl'
                    >
                        Login
                    </Heading>
                    <FormControl id='email'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CBiSolidUser
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='email'
                                placeholder='Email Address'
                                focusBorderColor='teal'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                isRequired
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id='password'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CBiSolidLockAlt
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='Password'
                                focusBorderColor='teal'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
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
                    </FormControl>
                    <Text>Forgot Your Password?</Text>
                    <Button
                        colorScheme='teal'
                        size={{ base: 'md', md: 'lg' }}
                        w='100%'
                        isLoading={loading}
                        type='submit'
                    >
                        Sign In
                    </Button>
                    {error && <ErrorAlert error={error} />}
                </VStack>

                <Box
                    display={{ base: 'block', md: 'none' }}
                    position='relative'
                    top={3}
                    py={5}
                >
                    <Box width='100%' bg='gray.300' h='1px'></Box>
                    <AbsoluteCenter
                        px='4'
                        fontWeight='bold'
                        bg='gray.100'
                    >
                        OR
                    </AbsoluteCenter>
                </Box>

                <Flex
                    mt={{ base: 5, md: 120 }}
                    h='100%'
                    w={{ base: '100%', md: '400px' }}
                    flexDir='column'
                    pt={{ base: 0, md: 5 }}
                    pl={{ md: 20 }}
                    px={{ base: 5 }}
                    gap={5}
                >
                    <Box
                        display={{ base: 'none', md: 'block' }}
                    >
                        <Heading
                            as='h2'
                            size='xl'
                        >
                            I&apos;m new here
                        </Heading>
                        <Text>
                            Creating an account is easy and only takes a few seconds.
                            You&apos;ll be able to track your orders and view your personal information.
                        </Text>
                    </Box>
                    <Link to='/register'>
                        <Button
                            colorScheme='teal'
                            variant='outline'
                            mt={{ base: 1, md: 0 }}
                            size={{ base: 'md', md: 'lg' }}
                            w='100%'
                        >
                            Register
                        </Button>
                    </Link>
                </Flex>
            </Flex>
            <Box
                bg='gray.100'
                w="100%"
            >
                <SVG />
            </Box>
        </>
    )
}

export default LoginForm */