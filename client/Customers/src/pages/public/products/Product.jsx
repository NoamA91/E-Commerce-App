import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    Stack,
    Heading,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { CartContext } from '../../../context/CartContext'
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../../../components/ErrorAlert';
import InfoAlert from '../../../components/InfoAlert';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [itemAvailableInCart, setItemAvailableInCart] = useState(false);
    const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
    const outOfStockMessage = "'Aw Snap!' Just sold out. But don't worry, we'll restock soon."
    const itemAvailableInCartMessage = "This product is available in your cart"
    const { addToCart, cart } = useContext(CartContext);
    const toast = useToast();
    const outOfStock = product?.count_in_stock === 0;
    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.state?.pageNumber || 1;

    useEffect(() => {
        setItemAvailableInCart(cart.map((item) => item._id).includes(product?._id));
    }, [cart, product]);


    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/products/getById/${id}`
                );
                setProduct(data.product);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />
    }

    const handleBuyNow = () => {
        // handle buy now functionality
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAddedToCart(true);
        setIsAddToCartClicked(true);

        toast({
            title: "Product added.",
            position: 'top',
            description: `${product.title} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        })

        setTimeout(() => {
            setIsAddedToCart(false);
        }, 2000);
    }

    const handleChangeQuantity = (value) => {
        setQuantity(parseInt(value));
    }

    return (
        <Box
            p={5}
            minH='80vh'
            maxW='100%'
            bg='gray.200'
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.4,
                    delayChildren: 0.3,
                    staggerChildren: 0.2
                }
            }}
            exit={{ opacity: 0 }}
        >
            <Button
                onClick={() =>
                    navigate('/shop', { state: { pageNumber: currentPage } })}
                leftIcon={<ArrowBackIcon />}
            >
                Back
            </Button>
            <Flex
                direction={['column', 'column', 'row']}
                align={{ md: 'center' }}
                justify={{ md: 'center' }}
                gap={{ md: 10 }}
                bg='whiteAlpha.700'
                border='1px solid #ccc'
                borderRadius={5}
                p={{ base: 5, md: 10 }}
                mt={5}
                minH='300px'
            >
                <Box flexShrink={0}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        boxSize={{ base: 'full', md: '400px' }}
                        objectFit='contain'
                    />
                </Box>
                <Stack
                    spacing={3}
                    minW={200}
                    w={500}
                    maxW={{ base: 'full', md: 'full' }}
                >
                    <Heading
                        mt={{ base: 2, md: 0 }}
                        fontSize={{ base: 'xl', md: '2xl' }}
                    >
                        {product.title}
                    </Heading>
                    <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                    >
                        {product.description}
                    </Text>
                    <Text
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontFamily='fantasy'
                        color='red.600'
                    >
                        Price: ${product.price}
                    </Text>
                    <NumberInput
                        w='30%'
                        min={1}
                        max={product.count_in_stock}
                        value={quantity}
                        onChange={handleChangeQuantity}
                        isDisabled={outOfStock}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Stack direction='column' spacing={3}>
                        <Button
                            colorScheme='teal'
                            onClick={handleBuyNow}
                            isDisabled={outOfStock}
                        >
                            Buy Now
                        </Button>
                        <Button
                            colorScheme='teal'
                            variant='outline'
                            onClick={handleAddToCart}
                            isLoading={isAddedToCart}
                            isDisabled={outOfStock}
                        >
                            Add to Cart
                        </Button>
                        {itemAvailableInCart && !isAddToCartClicked && (
                            <Box
                                color="blue.500"
                                py="1"
                                fontSize="sm"
                                fontWeight="bold"
                            >
                                <InfoAlert message={itemAvailableInCartMessage} />
                            </Box>
                        )}
                        {outOfStock && (
                            <Box
                                color="red.500"
                                py="1"
                                fontSize="sm"
                                fontWeight="bold"
                            >
                                <ErrorAlert error={outOfStockMessage} />
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    )
}

export default Product;
