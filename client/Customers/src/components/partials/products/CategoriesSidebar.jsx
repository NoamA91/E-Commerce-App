import { useBreakpointValue, Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import Products from '../../../pages/public/shop/Products';

const CategoriesSidebar = ({ products, onCategoryChange, onAnimalTypeChange }) => {

    const layout = useBreakpointValue({ base: 'drawer', md: 'sidebar' });

    // fillters
    const animalTypes = [...new Set(products.map(product => product.category.animal_type))];
    const categories = [...new Set(products.map(product => product.category.name))];


    return (
        <>
            {layout === 'drawer' && (
                <>
                    <Box ml={{ base: 2, md: 10 }}>
                        <Select mb={3}
                            size='sm'
                            shadow='md'
                            variant='filled'
                            placeholder="Filter by Pet Type"
                            onChange={e => onAnimalTypeChange(e.target.value)}

                        >
                            {animalTypes.map((animalType, index) => (
                                <option key={index} value={animalType}>{animalType}</option>
                            ))}
                        </Select>

                        <Select
                            size='sm'
                            shadow='md'
                            variant='filled'
                            placeholder="Filter by Category"
                            onChange={e => onCategoryChange(e.target.value)}
                        >
                            {categories.map((categoryName, index) => (
                                <option key={index} value={categoryName}>{categoryName}</option>
                            ))}
                        </Select>
                    </Box>
                </>
            )}
            {layout === 'sidebar' && (
                <Box w='20%' bg='blackAlpha.800'>
                    {/* Categories Sidebar */}
                    <p>Category 1</p>
                    <p>Category 2</p>
                    <p>Category 3</p>
                </Box>
            )}
        </>
    )
}

export default CategoriesSidebar;
