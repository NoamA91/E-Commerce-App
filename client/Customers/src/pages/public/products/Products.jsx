import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import CatgoriesSidebar from '../../../components/partials/products/CategoriesSidebar';
import ProductsContainer from '../../../components/partials/products/ProductsContainer';
import ErrorAlert from '../../../components/ErrorAlert';

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
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`,
                { cancelToken: source.token }
            );
            setProducts(response.data.products);

        } catch (error) {
            setError(error)
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


    let filteredProducts = [];
    if (products) {
        filteredProducts = products.filter(product =>
            (selectedAnimalTypeSidebar === "" || product.category.animal_type === selectedAnimalTypeSidebar) &&
            (selectedCategorySidebar === "" || product.category.name === selectedCategorySidebar)
        );
    }

    if (error) return (
        <Box
            w='100%'
            h='100vh'
            bg='gray.200'
        >
            <ErrorAlert error={error} />
        </Box>
    )


    return (
        <Flex
            as={motion.div}
            minH='100vh'
            w='100%'
            flexDir={{ base: 'column', md: 'row' }}
            justifyContent='cetner'
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
            <CatgoriesSidebar
                products={products}
                onCategoryChange={handleCategoryChange}
                onAnimalTypeChange={handleAnimalTypeChange}
            />

            <Box w='100%'
                bg='gray.200'
            >
                {filteredProducts && <ProductsContainer products={filteredProducts} loading={loading} />}
            </Box>
        </Flex>
    )
}

export default Products;