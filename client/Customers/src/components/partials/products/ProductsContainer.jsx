import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import PropTypes from 'prop-types';


const ProductsContainer = ({ products }) => {
    return (
        <Flex
            mt={{ base: 0, md: 5 }}
            mx={{ base: 1.5 }}
            mr={{ md: '15%' }}
            border='1px solid #ccc'
            borderRadius={5}
            p={5}
            bg='whiteAlpha.700'
            minH='100vh'
            wrap="wrap"
            justify="start"
        >
            {products.map((product, index) => (
                <Box
                    w={{ base: "100%", sm: "250px" }}
                    m={2}
                    key={index}
                >
                    <ProductCard product={product} key={index} />
                </Box>
            ))}
        </Flex>

        // <SimpleGrid
        //     minChildWidth={250}
        //     gap={3}
        //     mt={{ base: 0, md: 5 }}
        //     mr={{ md: '15%' }}
        //     mx={{ base: 1.5 }}
        //     border='1px solid #ccc'
        //     borderRadius={5}
        //     p={5}
        //     bg='whiteAlpha.600'
        //     minH='100vh'
        // >
        //     {products.map((product, index) => (
        //         <ProductCard product={product} key={index} />
        //     ))}
        // </SimpleGrid>

    )
}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsContainer