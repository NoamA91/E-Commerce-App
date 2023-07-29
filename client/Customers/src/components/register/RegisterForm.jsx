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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiSolidUser, BiSolidLockAlt, BiSolidPhone } from 'react-icons/bi'
import { IoMail } from 'react-icons/io5';
import { TbLockCheck } from 'react-icons/tb';
import SVG from '../partials/login/SVG';
import ErrorAlert from '../ErrorAlert';
import { useState } from 'react';
import { motion } from 'framer-motion';

const RegisterForm = ({ handleSubmit, handleChange, values, loading, error }) => {
    const [show, setShow] = useState(false)
    const handleShowPass = () => setShow(!show)
    const CBiSolidUser = chakra(BiSolidUser);
    const CBiSolidLockAlt = chakra(BiSolidLockAlt);
    const CIoMail = chakra(IoMail);
    const CbPhone = chakra(BiSolidPhone);
    const CTbLockCheck = chakra(TbLockCheck);

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
                    minH='400px'
                    mt={{ base: 5, md: 120 }}
                    boxShadow={{ md: 'md' }}
                    borderRadius={10}
                    p={5}
                    onSubmit={onSubmit}
                    pos='absolute'

                >
                    <Heading
                        as='h2'
                        size='xl'
                    >
                        Register
                    </Heading>

                    <Text
                        fontWeight='bold'
                        textAlign='center'
                    >Please enter your information</Text>

                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CBiSolidUser
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='text'
                                placeholder='Full Name'
                                focusBorderColor='teal'
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                isRequired
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CIoMail
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

                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CbPhone
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='tel'
                                placeholder='Phone Number'
                                focusBorderColor='teal'
                                name='phone_number'
                                value={values.phone_number}
                                onChange={handleChange}

                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
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

                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CTbLockCheck
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='password'
                                placeholder='Confirm Password'
                                focusBorderColor='teal'
                                name='password_confirm'
                                value={values.password_confirm}
                                onChange={handleChange}
                                isRequired
                            />
                        </InputGroup>
                    </FormControl>

                    <Text>
                        Already have an account? Login{" "}
                        <Link to='/login'
                            style={{
                                textDecoration: 'underline',
                                color: 'blue',
                            }}
                        >
                            here
                        </Link>
                    </Text>

                    <Button
                        colorScheme='teal'
                        size={{ base: 'md', md: 'lg' }}
                        w='100%'
                        loading={loading.toString()}
                        type='submit'
                    >
                        Create Account
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
            </Flex>

            <Box
                bg='gray.100'
                w='100%'
            >
                <SVG />
            </Box>
        </>
    )
}

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default RegisterForm