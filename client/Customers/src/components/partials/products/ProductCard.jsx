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
    Box,
    Link as ChakraLink
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleClick = () => {
        addToCart(product, 1);
        setIsAddedToCart(true);

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
                scale: 1.013,
                transition: { duration: 0.2 },
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
            }}

        >
            <CardBody
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                h={250}
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
                >
                    <ChakraLink
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
                        <Text size='sm'
                            noOfLines={2}>{product.description}</Text>
                    </ChakraLink>

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
                        addToCart(product, 1)
                    }}
                >
                    Add to cart
                </Button>
            </CardFooter>
            {isAddedToCart &&
                <Box
                    as={motion.div}
                    position='absolute'
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bg='whiteAlpha.700'
                    borderRadius='md'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    fontWeight='bold'
                    fontSize='xl'

                >
                    <Box
                        bg='black'
                        borderRadius='md'
                        p={2}
                        fontWeight='bold'
                        color='ShopYellow'
                    >
                        Added to Cart
                    </Box>
                </Box>
            }
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard