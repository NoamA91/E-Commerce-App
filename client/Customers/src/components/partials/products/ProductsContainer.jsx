import {
    Box,
    Flex,
    Image,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Pagination from './Pagination';
import { useContext } from 'react';
import { CurrentPageContext } from '../../../context/CurrentPageContext';


const ProductsContainer = ({ products, loading }) => {
    const [search, setSearch] = useState('');
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
    const productsPerPage = 10;

    const handleSearch = (e) => setSearch(e.target.value);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    if (loading) return <LoadingSpinner />;

    return (
        <Stack
            mt={{ base: 0, md: 5 }}
            mx={{ base: 1.5 }}
            mr={{ md: 0, lg: '15%' }}
            border='1px solid #ccc'
            borderRadius={5}
            p={5}
            bg='whiteAlpha.500'
            minH={currentProducts < 5 ? '100vh' : 'auto'}
        >
            <Flex
                w='100%'
                direction='column'
            >
                <Input
                    placeholder='Search...'
                    value={search}
                    onChange={handleSearch}
                    mb={3}
                    variant='outline'
                    bg='whiteAlpha.900'
                />
                <Flex
                    direction='column'
                    flex='1'
                    justifyContent='space-between'
                >
                    {currentProducts.length > 0 ? (
                        <Flex flexWrap='wrap' gap={{ base: 5, md: 1 }}>
                            {currentProducts.map((product) => (
                                <Box
                                    as={motion.div}
                                    w={{ base: '100%', sm: '400px', md: '320px', lg: '242px' }}
                                    m={2}
                                    key={product._id}
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
                                    <ProductCard
                                        product={product}
                                        currentPage={currentPage}
                                        key={product._id}
                                    />
                                </Box>
                            ))}
                        </Flex>
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
                                alt='No products found'
                            />
                            <Text>No products found</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
            <Pagination
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                onPageChange={handlePageChange}
            />
        </Stack>
    );
}

ProductsContainer.propTypes = {
    products: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ProductsContainer;