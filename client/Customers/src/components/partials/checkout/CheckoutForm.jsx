import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Image,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import ErrorAlert from '../../ErrorAlert';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoAlert from '../../InfoAlert';


const CheckoutForm = ({ values, paymentsValues, setPaymentValues, HandlePayment, error, handleChange, loading }) => {
    const { cart } = useContext(CartContext);
    const subtotal = cart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
    const [touchedFields, setTouchedFields] = useState({});
    const EmptyCartMessage = 'Your cart is empty. Please add items to your cart to place an order. Thank you! :)'
    const handleBlur = (field) => {
        if (field.startsWith('payments.')) {
            const paymentsField = field.split('.')[1];
            setTouchedFields({ ...touchedFields, [paymentsField]: true });
        }
        else if (field.startsWith('address.')) {
            const addressField = field.split('.')[1];
            setTouchedFields({ ...touchedFields, [addressField]: true });
        } else {
            setTouchedFields({ ...touchedFields, [field]: true });
        }
    };

    const getNestedProp = (obj, path) => {
        return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
    };

    const isError = (field) => {
        if (field.startsWith('address.')) {
            const addressField = field.split('.')[1];
            return touchedFields[addressField] && getNestedProp(values, field) === "";
        }
        else if (field.startsWith('payments.')) {
            const paymentsField = field.split('.')[1];
            return touchedFields[paymentsField] && paymentsValues[paymentsField] === "";
        }
        return touchedFields[field] && values[field] === "";
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <>
            <Modal isOpen={loading} isCentered>
                <ModalOverlay />
                <ModalContent
                    w='150px'
                    h='120px'
                >
                    <VStack
                        justifyContent='center'
                        alignContent='center'
                        w='150px'
                        h='120px'
                    >
                        <Text>Placing your order..</Text>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="ShopTeal.300"
                            size="xl"
                        />
                    </VStack>
                </ModalContent>
            </Modal>

            <Box
                as={motion.div}
                initial={{ opacity: 0, delayChildren: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                minH='85vh'
                bg='gray.200'
                pb={5}
            >

                <Heading
                    textAlign='center'
                    py={5}
                >
                    CHECKOUT
                </Heading>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    HandlePayment();
                }}>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify="space-between"
                        mx="auto"
                        width={{ base: "90%", md: "80%", lg: "70%" }}
                    >
                        <Flex
                            direction='column'
                            width={{ base: "100%", md: "60%" }}
                        >
                            <Flex
                                flexDir='column'
                                bg='whiteAlpha.700'
                                boxShadow='md'
                                borderRadius={10}
                                p={4}
                                mb={4}
                                gap={2}
                            >
                                <Heading size='md'>Delivery</Heading>

                                <Divider />

                                <FormControl isInvalid={isError('username')}>
                                    <Input
                                        value={values.username}
                                        isRequired
                                        type='text'
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('username')}
                                        name='username'
                                        placeholder='Username'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('username')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Username is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('email')}>
                                    <Input
                                        value={values.email}
                                        isRequired
                                        type='email'
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('email')}
                                        name='email'
                                        placeholder='Email Address'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('email')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('phone_number')}>
                                    <Input
                                        value={values.phone_number}
                                        type='tel'
                                        isRequired
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('phone_number')}
                                        name='phone_number'
                                        placeholder='Phone Number'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('phone_number')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Phone number is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('address.street')}>
                                    <Input
                                        value={values.address?.street}
                                        isRequired
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('street')}
                                        name='address.street'
                                        placeholder='Street'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('address.street')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Street is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('address.city')}>
                                    <Input
                                        value={values.address?.city}
                                        type='text'
                                        isRequired
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('city')}
                                        name='address.city'
                                        placeholder='City'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('address.city')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>City is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('address.building')}>
                                    <Input
                                        value={values.address?.building}
                                        type='number'
                                        isRequired
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('building')}
                                        name='address.building'
                                        placeholder='Building'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('address.building')}
                                        errorBorderColor='red.300'
                                        min={1}
                                    />
                                    <FormErrorMessage>Building is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('address.apartment')}>
                                    <Input
                                        value={values.address?.apartment}
                                        type='number'
                                        isRequired
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('address.apartment')}
                                        name='address.apartment'
                                        placeholder='Apartment'
                                        focusBorderColor='teal'
                                        variant='filled'
                                        isInvalid={isError('address.apartment')}
                                        errorBorderColor='red.300'
                                        min={1}
                                    />
                                    <FormErrorMessage>Apartment is required.</FormErrorMessage>
                                </FormControl>
                            </Flex>

                            <Flex
                                flexDir='column'
                                bg='whiteAlpha.700'
                                boxShadow='md'
                                borderRadius={10}
                                p={4}
                                h='100%'
                                gap={2}
                            >
                                <Heading size='md'>Payment</Heading>
                                <Divider />

                                <FormControl isInvalid={isError('payments.credit_number')}>
                                    <Input
                                        isRequired
                                        onChange={(e) => {
                                            setPaymentValues({ ...paymentsValues, credit_number: e.target.value })
                                        }}
                                        onBlur={() => handleBlur('payments.credit_number')}
                                        name="credit_number"
                                        placeholder="Card Number"
                                        focusBorderColor='teal'
                                        variant='filled'
                                        maxLength="16"
                                        isInvalid={isError('payments.credit_number')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Credit number is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('payments.exp')}>
                                    <Input
                                        isRequired
                                        onChange={(e) => {
                                            setPaymentValues({ ...paymentsValues, exp: e.target.value })
                                        }}
                                        onBlur={() => handleBlur('payments.exp')}
                                        name="expDate"
                                        placeholder="Expiration Date (mm/yy)"
                                        focusBorderColor='teal'
                                        variant='filled'
                                        maxLength="5"
                                        isInvalid={isError('payments.exp')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>Expiration date is required.</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={isError('payments.cvv')}>
                                    <Input
                                        isRequired
                                        onChange={(e) => {
                                            setPaymentValues({ ...paymentsValues, cvv: e.target.value })
                                        }}
                                        onBlur={() => handleBlur('payments.cvv')}
                                        name="cvv"
                                        placeholder="CVV"
                                        focusBorderColor='teal'
                                        variant='filled'
                                        maxLength="3"
                                        isInvalid={isError('payments.cvv')}
                                        errorBorderColor='red.300'
                                    />
                                    <FormErrorMessage>CVV is required.</FormErrorMessage>
                                </FormControl>
                            </Flex>
                        </Flex>

                        <Flex
                            width={{ base: "100%", md: "35%" }}
                            flexDir='column'
                        >
                            <Flex
                                border='3px solid teal'
                                flexDir='column'
                                bg='whiteAlpha.700'
                                boxShadow='md'
                                borderRadius={10}
                                mt={{ base: 4, md: 0 }}
                                minW='300px'
                            >
                                <Flex
                                    flexDir='column'
                                    p={3}
                                    gap={1}
                                >
                                    <Heading size='md' mb={2}>
                                        Order Summary
                                    </Heading>
                                    <Divider />
                                    {cart.map((item) => (
                                        <Flex
                                            key={item._id}
                                            p={2}
                                            mt={2}
                                            borderRadius={10}
                                            bg='whiteAlpha.600'
                                            boxShadow='sm'
                                        >
                                            <Flex flexDir='row'>
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width='50px'
                                                    height='50px'
                                                />
                                                <Text
                                                    fontSize='sm'
                                                    fontWeight='semibold'
                                                    mt={2}
                                                    ml={2}
                                                >
                                                    {item.title}
                                                </Text>
                                            </Flex>
                                            <Text
                                                fontSize='md'
                                                ml='auto'
                                                mt={2}
                                            >
                                                {item.quantity} x ${item.price}
                                            </Text>
                                        </Flex>
                                    ))}
                                    <Divider />
                                    <Flex
                                        p={2}
                                        justifyContent='space-between'
                                    >
                                        <Text>Subtotal</Text>
                                        <Text fontWeight='semibold'>
                                            ${subtotal.toFixed(2)}
                                        </Text>
                                    </Flex>

                                    <Flex
                                        p={2}
                                        justifyContent='space-between'
                                    >
                                        <Text>Shipping</Text>
                                        <Text fontWeight='semibold'>
                                            $0.00
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex
                                    p={5}
                                    justifyContent='space-between'
                                    bg='teal'
                                >
                                    <Text
                                        fontWeight='bold'
                                        fontSize='xl'
                                        color='white'
                                    >
                                        Total
                                    </Text>
                                    <Text
                                        fontWeight='semibold'
                                        fontSize='xl'
                                        color='white'
                                    >
                                        ${subtotal.toFixed(2)}
                                    </Text>
                                </Flex>
                            </Flex>
                            {cart.length > 0 ? (
                                <Button
                                    mt={5}
                                    p={6}
                                    colorScheme='yellow'
                                    width="100%"
                                    isDisabled={loading}
                                    minW='300px'
                                    boxShadow='md'
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    type='submit'
                                >
                                    Place Order
                                </Button>
                            ) : (
                                <>
                                    <Flex
                                        mt={5}
                                        flexDir='column'
                                        gap={4}
                                        color='blue.600'
                                        fontWeight='bold'
                                    >
                                        <InfoAlert message={EmptyCartMessage} />
                                        <Link to='/products' width='100%'>
                                            <Button
                                                colorScheme='teal'
                                                p={6}
                                                w='100%'
                                            >
                                                Back to Shop
                                            </Button>
                                        </Link>
                                    </Flex>
                                </>
                            )}
                            <br />
                            {error && !loading &&
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    minW='300px'
                                >
                                    <ErrorAlert error={error} />
                                </Box>
                            }
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </>
    )
}

export default CheckoutForm