import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    Stack,
    Heading,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import LoadingSpinner from '../../../components/LoadingSpinner';


const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getById/${id}`);
                setProduct(response.data);
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

    if (!product) {
        return <Text>No product found.</Text>;
    }

    const handleBuyNow = () => {
        // handle buy now functionality
    }

    const handleAddToCart = () => {
        // handle add to cart functionality
    }

    const handleChangeQuantity = (value) => {
        setQuantity(value);
    }

    return (
        <Box
            p={5}
            h='90vh'
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
            <Flex
                direction={['column', 'row']}
                align='start'
                bg='whiteAlpha.700'
                border='1px solid #ccc'
                borderRadius={5}
                p={10}
                minH='90%'
            >
                <Box flexShrink={0} mr={5} >
                    <Image src={product.image} alt={product.title} boxSize="300px" objectFit="contain" />
                </Box>
                <Stack spacing={3}>
                    <Heading>{product.title}</Heading>
                    <Text>{product.description}</Text>
                    <Text fontSize="2xl">Price: ${product.price}</Text>
                    <NumberInput min={1} value={quantity} onChange={handleChangeQuantity}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Stack direction="row" spacing={2}>
                        <Button colorScheme="teal" onClick={handleBuyNow}>Buy Now</Button>
                        <Button colorScheme="blue" onClick={handleAddToCart}>Add to Cart</Button>
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    )
}

export default Product;
