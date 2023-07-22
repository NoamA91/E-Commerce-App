import {
    Box,
    Flex,
    Image,
    Input,
    Stack,
    Text
} from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import PropTypes from 'prop-types';
import LoadingSpinner from "../../LoadingSpinner";
import { useState } from "react";
import { motion } from "framer-motion";


const ProductsContainer = ({ products, loading }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(search.toLowerCase())
    }
    );

    if (loading) return <LoadingSpinner />

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
            <Stack w='100%'>
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    mb={3}
                    variant='outline'
                    bg='whiteAlpha.900'
                />
                <Flex
                    wrap="wrap"
                    pl={2}
                >
                    {filteredProducts.length > 0 ? (
                        <>
                            {filteredProducts.map((product, index) => (
                                <Box
                                    as={motion.div}
                                    w={{ base: "100%", sm: "245px" }}
                                    m={2}
                                    key={index}
                                    initial={{
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
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
            </Stack>
        </Flex>
    )
}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ProductsContainer