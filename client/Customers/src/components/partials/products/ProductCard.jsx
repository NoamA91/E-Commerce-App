import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
    Image,
    useToast,
    Box
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const toast = useToast();
    const outOfStock = product?.count_in_stock === 0;

    const handleClick = () => {
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

    return (
        <Card
            as={motion.div}
            maxW='sm'
            h={420}
            whileHover={{
                scale: 1.010,
                transition: { duration: 0.2 },
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
            }}
            position='relative'
        >
            {outOfStock && (
                <Box
                    position="absolute"
                    top="2"
                    right="2"
                    bg="red.500"
                    color="white"
                    px="2"
                    py="1"
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="bold"
                    zIndex="1"
                >
                    Sold Out
                </Box>
            )}
            <CardBody
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                h={250}
                pb={0}
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    borderRadius='lg'
                    w='100%'
                    h={200}
                    objectFit='cover'
                    cursor='pointer'
                    onClick={() => {
                        navigate(`/product/${product._id}`);
                    }}
                />
                <Stack
                    mt='5'
                    maxW='200px'
                    alignContent='space-between'
                >
                    <Link
                        onClick={() => {
                            navigate(`/product/${product._id}`);
                        }}
                    >
                        <Heading
                            size='sm'
                            noOfLines={2}
                        >
                            {product.title}
                        </Heading>
                        <Text
                            fontSize='sm'
                            _hover={{ textDecoration: 'underline' }}
                            noOfLines={2}
                        >
                            {product.description}
                        </Text>
                    </Link>

                    <Text color='red.600' fontSize='xl' fontFamily='fantasy'>
                        ${product.price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider color='gray.200' />
            <CardFooter>
                <Button
                    variant='outline'
                    colorScheme='teal'
                    w='100%'
                    onClick={() => {
                        handleClick()
                    }}
                    isLoading={isAddedToCart}
                    isDisabled={outOfStock}
                >
                    Add to cart
                </Button>
            </CardFooter>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard