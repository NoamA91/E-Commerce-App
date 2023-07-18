import {
    useBreakpointValue,
    Box,
    Text,
    Divider,
    Checkbox,
    VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const CategoriesSidebar = ({ products, onCategoryChange, onAnimalTypeChange }) => {

    const layout = useBreakpointValue({ base: 'select', md: 'sidebar' });

    const [selectedAnimalType, setSelectedAnimalType] = useState("All");
    const [selectedCategoryName, setSelectedCategoryName] = useState("All");
    const [selectedAnimalTypeSidebar, setSelectedAnimalTypeSidebar] = useState(null);
    const [selectedCategorySidebar, setSelectedCategorySidebar] = useState(null);


    const animalTypes = [...new Set(products.map(product => product.category.animal_type))];
    const categories = [...new Set(products.map(product => product.category.name))];



    const handleAnimalTypeCheckboxChange = (e, layoutType) => {
        const value = e.target.checked ? e.target.value : null;
        if (layoutType === "select") {
            setSelectedAnimalType(value);
            setSelectedAnimalTypeSidebar(value);
        } else {
            setSelectedAnimalTypeSidebar(value);
            setSelectedAnimalType(value);
        }
        onAnimalTypeChange(value ? value : "");
    }

    const handleCategoryCheckboxChange = (e, layoutType) => {
        const value = e.target.checked ? e.target.value : null;
        if (layoutType === "select") {
            setSelectedCategoryName(value);
            setSelectedCategorySidebar(value);
        } else {
            setSelectedCategorySidebar(value);
            setSelectedCategoryName(value);
        }
        onCategoryChange(value ? value : "");
    }

    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        open: { opacity: 1, height: "auto" },
        closed: { opacity: 0, height: 0 }
    };

    return (
        <>
            {layout === 'select' && (
                <>
                    <Box
                        bg='gray.200'
                    >
                        <Box
                            bg='blackAlpha.900'
                            border='1px solid #ccc'
                            borderTopRadius={5}
                            p='10px'
                            m='10px 10px 0px 10px'
                            onClick={() => setIsOpen(!isOpen)}
                            display='flex'
                            justifyContent='space-between'
                        >
                            <Text color='ShopYellow'>Browse by Category</Text>
                            <Box>
                                {isOpen ? <MinusIcon color='ShopYellow' /> : <AddIcon color='ShopYellow' />}
                            </Box>
                        </Box>

                        <motion.div
                            initial="closed"
                            animate={isOpen ? "open" : "closed"}
                            variants={variants}
                        >
                            <Box
                                mx={3}
                                py={3}
                                px={5}
                                border='1px solid #ccc'
                                borderBottomRadius={5}
                                bg='white'
                            >
                                <VStack align="start" spacing={2}>
                                    <h2>Choose Pet Type:</h2>
                                    {animalTypes.map((animalType, index) => (
                                        <Checkbox
                                            key={index}
                                            value={animalType}
                                            isChecked={selectedAnimalType === animalType}
                                            onChange={(e) => handleAnimalTypeCheckboxChange(e, 'select')}>
                                            {animalType}
                                        </Checkbox>
                                    ))}
                                </VStack>

                                <Divider mt={5} mb={2} />

                                <VStack align="start" spacing={2}>
                                    <h2>Choose Category Type:</h2>
                                    {categories.map((category, index) => (
                                        <Checkbox
                                            key={index}
                                            value={category}
                                            isChecked={selectedCategoryName === category}
                                            onChange={(e) => handleCategoryCheckboxChange(e, 'select')}>
                                            {category}
                                        </Checkbox>
                                    ))}
                                </VStack>
                            </Box>

                        </motion.div>
                    </Box>

                </>
            )}
            {layout === 'sidebar' && (
                <Box w='20%' bg='gray.200'>
                    <Box
                        m={5}
                        border='1px solid #ccc'
                        borderRadius={5}
                        p={5}
                        bg='whiteAlpha.700'
                    >
                        <VStack
                            align="start"
                            spacing={2}
                        >
                            <Text>Pet Type:</Text>
                            {animalTypes.map((animalType, index) => (
                                <Checkbox
                                    key={index}
                                    value={animalType}
                                    isChecked={selectedAnimalTypeSidebar === animalType}
                                    onChange={(e) => handleAnimalTypeCheckboxChange(e, 'sidebar')}>
                                    {animalType}
                                </Checkbox>
                            ))}
                        </VStack>

                        <Divider mt={5} mb={2} />

                        <VStack
                            align="start"
                            spacing={2}
                        >
                            <Text>Category Type:</Text>
                            {categories.map((categoryName, index) => (
                                <Checkbox
                                    key={index}
                                    value={categoryName}
                                    isChecked={selectedCategorySidebar === categoryName}
                                    onChange={(e) => handleCategoryCheckboxChange(e, 'sidebar')}>
                                    {categoryName}
                                </Checkbox>
                            ))}
                        </VStack>

                    </Box>
                </Box>
            )}
        </>
    )
}

CategoriesSidebar.propTypes = {
    onAnimalTypeChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.shape({
                animal_type: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
};

export default CategoriesSidebar;


