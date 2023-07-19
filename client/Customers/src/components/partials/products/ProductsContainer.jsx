import { Box, Flex } from "@chakra-ui/react"
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
            gap={2}
        >
            {products.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
        </Flex>
    )

}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsContainer