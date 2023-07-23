import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
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
    Alert,
} from '@chakra-ui/react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { CartContext } from '../../../context/CartContext'


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const { addToCart } = useContext(CartContext);
    const toast = useToast();
    const outOfStock = product?.count_in_stock === 0;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getById/${id}`);
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
        addToCart(product, 1);
        setIsAddedToCart(true);

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
        setQuantity(value);
    }

    return (
        <Box
            p={5}
            minH='80vh'
            w='100%'
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
            <Link to='/shop'>
                <Button>Back</Button>
            </Link>
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
                        boxSize='400px'
                        objectFit='contain'
                    />
                </Box>
                <Stack
                    spacing={3}
                    minW={200}
                    w={500}
                    maxW={{ base: '280px', md: '100%' }}
                >
                    <Heading mt={{ base: 2, md: 0 }}>{product.title}</Heading>
                    <Text>{product.description}</Text>
                    <Text
                        fontSize='2xl'
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
                            maxW={{ base: '280px', md: '100%' }}
                            isLoading={isAddedToCart}
                            isDisabled={outOfStock}
                        >
                            Add to Cart
                        </Button>
                        {outOfStock && (
                            <Box
                                color="red.500"
                                px="2"
                                py="1"
                                borderRadius="md"
                                fontSize="sm"
                                fontWeight="bold"
                                zIndex="1"
                            >
                                <Alert status='error'>&apos;Aw Snap!&apos; Just sold out. Don&apos;t worry, we&apos;ll restock soon.</Alert>
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    )
}

export default Product;
