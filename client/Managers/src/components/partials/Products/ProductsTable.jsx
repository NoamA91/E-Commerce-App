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
    Tooltip
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
    return (
        <>
            <Button
                colorScheme='teal'
                p='4'
                leftIcon={<FiPlusCircle fontSize={25} />}
                mt={10}
                float='right'
                mr={10}
                onClick={onOpen}
            >Add Product</Button>

            <TableContainer h='100vh' mt={100} >
                <Table variant="striped">
                    <TableCaption>Products Information</TableCaption>
                    <Thead>
                        <Tr
                            position='sticky'
                        >
                            <Th>Name</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>Animal Type</Th>
                            <Th>Category</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>Description</Th>
                            <Th>Price</Th>
                            <Th>Image</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr key={product._id}>
                                <Td>
                                    <Tooltip label={product.title} placement="auto" hasArrow>
                                        <Box isTruncated maxW="200px">{product.title}</Box>
                                    </Tooltip>
                                </Td>
                                <Td display={{ base: 'none', md: 'table-cell' }}>{product.category.animal_type}</Td>
                                <Td>{product.category.name}</Td>
                                <Td display={{ base: 'none', md: 'table-cell' }}>
                                    <Tooltip label={product.description} placement="auto" hasArrow>
                                        <Box isTruncated maxW="200px">{product.description}</Box>
                                    </Tooltip>
                                </Td>
                                <Td>{product.price}$</Td>
                                <Td>
                                    <Box boxSize='100px'>
                                        <Image
                                            w='100%'
                                            aspectRatio={1}
                                            objectFit='cover'
                                            src={product.image}
                                            alt={product.title}
                                        />
                                    </Box>
                                </Td>
                                <Td>
                                    <Box d="flex" justifyContent="end">
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
                            <Button onClick={alertDialogState.onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                ml={3}
                                onClick={() => {
                                    deleteProduct(productToDelete);
                                    setProductToDelete(null);
                                    alertDialogState.onClose();
                                }}
                            >
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent >
                </AlertDialogOverlay >
            </AlertDialog>
        </>
    )
}

export default ProductsTable