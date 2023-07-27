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
    Divider,
    AbsoluteCenter
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { BiSolidUser, BiSolidLockAlt } from 'react-icons/bi'
import { useState } from 'react';

const Login = () => {
    const [show, setShow] = useState(false)
    const handleShowPass = () => setShow(!show)
    const CBiSolidUser = chakra(BiSolidUser);
    const CBiSolidLockAlt = chakra(BiSolidLockAlt);

    return (
        <Flex
            as={motion.div}
            flexDir={['column', 'row']}
            justifyContent={{ md: 'center' }}
            bg='gray.600'
            minH='90vh'
            w='100%'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <VStack
                spacing={5}
                w={{ base: '100%', md: '500px' }}
                h='100%'
                mt={{ base: 5, md: 120 }}
                boxShadow={{ md: 'md' }}
                borderRadius={10}
                p={5}
            >
                <Heading
                    as='h2'
                    size='xl'
                >
                    Login
                </Heading>
                <FormControl id='email'>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'
                            children={
                                <CBiSolidUser
                                    color='ShopTeal.200'
                                    fontSize='1.5em'
                                />}
                        >
                        </InputLeftElement>
                        <Input
                            type='email'
                            placeholder='Email'
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id='password'>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'
                            children={
                                <CBiSolidLockAlt
                                    color='ShopTeal.200'
                                    fontSize='1.5em'
                                />}
                        >
                        </InputLeftElement>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Password'
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
                    size='md'
                    w='100%'
                >
                    Login
                </Button>
            </VStack>

            <Box
                display={{ base: 'block', md: 'none' }}
                position='relative'
                py={5}
            >
                <Divider />
                <AbsoluteCenter
                    px='4'
                    fontWeight='bold'
                    bg='gray.600'
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
                        I'm new here
                    </Heading>
                    <Text>
                        Creating an account is easy and only takes a few seconds.
                        You'll be able to track your orders and view your personal information.
                    </Text>
                </Box>
                <Link to='/register'>
                    <Button
                        colorScheme='teal'
                        variant='outline'
                        size='md'
                        w='100%'
                    >
                        Register
                    </Button>
                </Link>
            </Flex>
        </Flex >
    )
}

export default Login;
