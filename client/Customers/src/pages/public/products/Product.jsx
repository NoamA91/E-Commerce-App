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
import { Helmet } from 'react-helmet';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [itemAvailableInCart, setItemAvailableInCart] = useState(false);
    const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
    const itemAvailableInCartMessage = "This product is available in your cart"
    const { addToCart, cart } = useContext(CartContext);
    const toast = useToast();
    const outOfStock = product?.count_in_stock === 0;
    const navigate = useNavigate();
    const location = useLocation();
    const currentPage = location.state?.pageNumber || 1;
    const outOfStockMessage = {
        message: "'Aw Snap!' Just sold out. But don't worry, we'll restock soon."
    }

    useEffect(() => {
        setItemAvailableInCart(cart.map((item) => item._id).includes(product?._id));
    }, [cart, product]);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/products/getById/${id}`
                );
                setProduct(data.product);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <Box
            w='100%'
            h='100vh'
            bg='gray.100'
        >
            <ErrorAlert error={error} />
        </Box>
    )

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
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
        <>
            <Helmet>
                {product && <title>PetShop | {product.title}</title>}
                <meta name="description" content="Product page" />
            </Helmet>
            <Box
                p={5}
                minH='80vh'
                maxW='100%'
                bg='radial-gradient(circle, rgba(60,188,170,1) 0%, rgba(141,201,160,1) 97%, rgba(255,220,145,1) 100%)'
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
                        navigate(-1, { state: { pageNumber: currentPage } })}
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
                            src={product?.image}
                            alt={product?.title}
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
                            {product?.title}
                        </Heading>
                        <Text
                            fontSize={{ base: 'md', md: 'md' }}
                        >
                            {product?.description}
                        </Text>
                        <Text
                            fontSize={{ base: 'xl', md: '2xl' }}
                            fontFamily='fantasy'
                            color='red.600'
                        >
                            Price: ${product?.price}
                        </Text>
                        <NumberInput
                            w='30%'
                            min={1}
                            max={product?.count_in_stock}
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
        </>
    )
}

export default Product;
