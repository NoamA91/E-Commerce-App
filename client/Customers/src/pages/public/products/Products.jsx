import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import CatgoriesSidebar from '../../../components/partials/products/CategoriesSidebar';
import ProductsContainer from '../../../components/partials/products/ProductsContainer';
import ErrorAlert from '../../../components/ErrorAlert';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { CurrentPageContext } from '../../../context/CurrentPageContext';

const Products = () => {
    const { setCurrentPage } = useContext(CurrentPageContext);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCategorySidebar, setSelectedCategorySidebar] = useState('');
    const [selectedAnimalTypeSidebar, setSelectedAnimalTypeSidebar] = useState('');

    const getAllProducts = async () => {
        const source = axios.CancelToken.source();

        setLoading(true);
        try {
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
            (selectedAnimalTypeSidebar === '' || product.category.animal_type === selectedAnimalTypeSidebar) &&
            (selectedCategorySidebar === '' || product.category.name === selectedCategorySidebar)
        );
    }

    if (loading) return <LoadingSpinner />;

    if (error) return (
        <Box
            w='100%'
            h='100vh'
            bg='gray.100'
        >
            <ErrorAlert error={error} />
        </Box>
    )


    return (
        <>
            <Helmet>
                <title>PetShop | All Products</title>
                <meta name="description" content="Products page" />
            </Helmet>
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
                // bg='radial-gradient(circle, rgba(255,220,145,0.9164040616246498) 12%, rgba(0,185,164,0.742734593837535) 66%, rgba(237,237,237,1) 98%)'
                bg='radial-gradient(circle, rgba(227,199,140,1) 0%, rgba(60,188,170,1) 38%, rgba(127,143,132,1) 100%)'
            >

                <CatgoriesSidebar
                    products={products}
                    onCategoryChange={handleCategoryChange}
                    onAnimalTypeChange={handleAnimalTypeChange}
                    setCurrentPage={setCurrentPage}
                />
                <Box w='100%'
                    overflowY='auto'
                >
                    {filteredProducts && <ProductsContainer products={filteredProducts} loading={loading} />}
                </Box >
            </Flex >
        </>
    )
}

export default Products;