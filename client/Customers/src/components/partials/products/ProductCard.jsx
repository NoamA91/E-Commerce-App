import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
    Image,
    Link as ChakraLink
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

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
                            display='inline-block'
                            size='sm'
                            noOfLines={2}
                        >
                            {product.title}
                        </Heading>
                    </ChakraLink>

                    <Text color='red.600' fontSize='xl' fontFamily='fantasy'>
                        ${product.price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider color='gray.200' />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='yellow'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='teal'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard