import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Image,
    Tooltip,
    Select,
    Flex,
    Text
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm'

const ProductsTable = ({ products, handleProductAdded, deleteProduct }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const alertDialogState = useDisclosure();
    const [productToDelete, setProductToDelete] = useState(null);

    // Fillters - states for the selected fillters
    const [selectedAnimalType, setSelectedAnimalType] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");

    // Get all unique animal types and category names for the filters
    const animalTypes = [...new Set(products.map(product => product.category.animal_type))];
    const categoryNames = [...new Set(products.map(product => product.category.name))];

    // Selected fillters
    const filteredProducts = products.filter(product =>
        (selectedAnimalType === "" || product.category.animal_type === selectedAnimalType) &&
        (selectedCategoryName === "" || product.category.name === selectedCategoryName)
    );

    return (
        <>
            <Flex
                flexDir={'column'}
                h='100vh'
            >
                <Flex
                    mt={10}
                    justifyContent='space-between'
                >
                    <Box ml={{ base: 2, md: 10 }}>
                        <Select mb={3}
                            size='sm'
                            shadow='md'
                            variant='filled'
                            placeholder="Filter by Animal Type"
                            onChange={e => setSelectedAnimalType(e.target.value)}
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
                            onChange={e => setSelectedCategoryName(e.target.value)}
                        >
                            {categoryNames.map((categoryName, index) => (
                                <option key={index} value={categoryName}>{categoryName}</option>
                            ))}
                        </Select>
                    </Box>

                    <Button
                        colorScheme='teal'
                        shadow='md'
                        p='4'
                        leftIcon={<FiPlusCircle fontSize={25} />}
                        mt={{ base: 0, md: 10 }}
                        mr={{ base: 2, md: 10 }}
                        float='right'
                        onClick={onOpen}
                    >Add Product</Button>
                </Flex>

                <TableContainer h='100%' overflowY='auto' mt={10} >
                    <Table variant="striped" size={{ base: "sm", md: "md" }}>
                        <TableCaption>Products Information</TableCaption>
                        <Thead>
                            <Tr
                                position='sticky'
                                top={0}
                                bg='gray.200'
                                w='100%'
                                zIndex={1}
                            >
                                <Th>Name</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Animal Type</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Category</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Description</Th>
                                <Th>Price</Th>
                                <Th>Image</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredProducts.map((product) => (
                                <Tr key={product._id}>
                                    <Td>
                                        <Text maxW={{ base: "100px", md: "200px" }} noOfLines={2}>{product.title}</Text>
                                    </Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>{product.category.animal_type}</Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>{product.category.name}</Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>
                                        <Tooltip label={product.description} placement="top" hasArrow>
                                            <Text isTruncated maxW={{ base: "100px", md: "200px" }}>{product.description}</Text>
                                        </Tooltip>
                                    </Td>
                                    <Td>${product.price}</Td>
                                    <Td>
                                        {product.count_in_stock === 0 ? (
                                            <>

                                                <Box boxSize='100px'>
                                                    <Image
                                                        w='100%'
                                                        aspectRatio={1}
                                                        objectFit='cover'
                                                        src={product.image}
                                                        alt={product.title}
                                                    />
                                                    <Box
                                                        bottom='7'
                                                        bg='red.500'
                                                        color='white'
                                                        py='1'
                                                        borderRadius='md'
                                                        fontSize='sm'
                                                        fontWeight='bold'
                                                        position='relative'
                                                        textAlign='center'
                                                        opacity={0.7}
                                                    >
                                                        Out Of Stock
                                                    </Box>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box boxSize='100px'>
                                                <Image
                                                    w='100%'
                                                    aspectRatio={1}
                                                    objectFit='cover'
                                                    src={product.image}
                                                    al
                                                    t={product.title}
                                                />
                                            </Box>
                                        )}
                                    </Td>
                                    <Td>
                                        <Box display="flex" justifyContent="end" flexDir={{ base: 'column', md: 'row' }}>
                                            <Button leftIcon={<FiEdit2 />} colorScheme="teal" variant="ghost" mr={2}
                                                onClick={() => navigate(`../products/edit-product/${product._id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="ghost"
                                                onClick={() => {
                                                    setProductToDelete(product._id);
                                                    alertDialogState.onOpen();
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer >

                <AddProductForm isOpen={isOpen} onClose={onClose} handleProductAdded={handleProductAdded} />

                <AlertDialog
                    isOpen={alertDialogState.isOpen}
                    onClose={() => {
                        setCategoryToDelete(null);
                        alertDialogState.onClose();
                    }}
                >
                    <AlertDialogOverlay backdropFilter='blur(1px)'>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Product
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Are you sure to the delete? You can't undo this action afterwards.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button
                                    colorScheme='red'
                                    onClick={() => {
                                        deleteProduct(productToDelete);
                                        setProductToDelete(null);
                                        alertDialogState.onClose();
                                    }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    ml={3}
                                    onClick={alertDialogState.onClose}
                                >
                                    Cancel
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent >
                    </AlertDialogOverlay >
                </AlertDialog>
            </Flex>
        </>
    )
}

export default ProductsTable