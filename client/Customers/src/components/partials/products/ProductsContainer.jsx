import { Box } from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import PropTypes from 'prop-types';


const ProductsContainer = ({ products }) => {
    return (
        <Box
            mt={{ base: 0, md: 5 }}
            mx={{ base: 1.5 }}
            border='1px solid #ccc'
            borderRadius={5}
            p={5}
            bg='whiteAlpha.700'
            minH='100vh'
        >
            {products.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
        </Box>
    )

}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsContainer