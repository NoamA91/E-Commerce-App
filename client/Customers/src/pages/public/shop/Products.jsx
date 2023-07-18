import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import CatgoriesSidebar from '../../../components/partials/products/CategoriesSidebar'

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
                backgroundColor: ''
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
                <Box w="80%" bg="gray.200">
                    {/* Products Container */}
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error.message}</div>}
                    {filteredProducts.map((product, index) => (
                        <Box key={index} border="1px" borderColor="gray.200" p="4" rounded="md">
                            <h2>{product.title}</h2>
                            <img src={product.image} alt={product.title} />
                            <p>{product.price}</p>
                        </Box>
                    ))}
                </Box>
            </Flex>
        </motion.div>
    )
}

export default Products;
