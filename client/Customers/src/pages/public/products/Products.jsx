import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import CatgoriesSidebar from '../../../components/partials/products/CategoriesSidebar'
import ProductsContainer from '../../../components/partials/products/ProductsContainer';

const Products = () => {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCategorySidebar, setSelectedCategorySidebar] = useState("");
    const [selectedAnimalTypeSidebar, setSelectedAnimalTypeSidebar] = useState("");

    const getAllProducts = async () => {
        const source = axios.CancelToken.source();

        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/products/getAll',
                { cancelToken: source.token }
            );
            setProducts(response.data.products);

        } catch (error) {
            setError(error)
            return console.log(error);
        } finally {
            setLoading(false);
        }
        return () => {
            source.cancel('Request canceled');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const handleCategoryChange = (category) => {
        setSelectedCategorySidebar(category);
    }

    const handleAnimalTypeChange = (animalType) => {
        setSelectedAnimalTypeSidebar(animalType);
    }

    const filteredProducts = products.filter(product =>
        (selectedAnimalTypeSidebar === "" || product.category.animal_type === selectedAnimalTypeSidebar) &&
        (selectedCategorySidebar === "" || product.category.name === selectedCategorySidebar)
    );


    return (
        <motion.div
            style={{
                minHeight: '100vh',
                width: '100%',
            }}
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
                flexDir={{ base: 'column', md: 'row' }}
            >
                <CatgoriesSidebar
                    products={products}
                    onCategoryChange={handleCategoryChange}
                    onAnimalTypeChange={handleAnimalTypeChange}
                />
                {/* <Box w='100%' bg='gray.200' px={{ base: '1%', md: '10%' }}> */}
                <Box w='100%' bg='gray.200'>
                    {loading && <LoadingSpinner />}
                    {error && <div>Error: {error.message}</div>}
                    {filteredProducts && <ProductsContainer products={filteredProducts} />}
                </Box>
            </Flex>
        </motion.div>
    )
}

export default Products;