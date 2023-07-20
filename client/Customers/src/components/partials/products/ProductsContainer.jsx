import {
    Box,
    Flex,
    Image,
    Input,
    Text
} from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import PropTypes from 'prop-types';
import LoadingSpinner from "../../LoadingSpinner";


const ProductsContainer = ({ products, loading }) => {

    if (loading) {
        return <LoadingSpinner />
    }

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
        >
            {products.length > 0 ? (
                <>
                    {products.map((product, index) => (
                        <Box
                            w={{ base: "100%", sm: "250px" }}
                            m={2}
                            key={index}
                        >
                            <ProductCard product={product} key={index} />
                        </Box>
                    ))}
                </>
            ) : (
                <Flex
                    w='100%'
                    h='100%'
                    align='center'
                    justify='center'
                    flexDir='column'
                >
                    <Image
                        w={150}
                        src='/crying-cat_1f63f.png'
                        alt="No products found"
                    />
                    <Text>No products found</Text>
                </Flex>
            )}
        </Flex>
    )
}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsContainer