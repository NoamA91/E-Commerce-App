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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddProductForm from './AddProductForm'

const ProductsTable = ({ products, handleProductAdded }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const alertDialogState = useDisclosure();
    const [ProductToDelete, setProductToDelete] = useState(null);
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
                        <Tr>
                            <Th>Name</Th>
                            <Th>Animal Type</Th>
                            <Th>Description</Th>
                            <Th>Price</Th>
                            <Th>Image</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr key={product._id}>
                                <Td>{product.title}</Td>
                                <Td>{product.category}</Td>
                                <Td>{product.description}</Td>
                                <Td>{product.price}</Td>
                                <Td>{product.image}</Td>
                                <Td>
                                    <Box d="flex" justifyContent="end">
                                        <Button leftIcon={<FiEdit2 />} colorScheme="teal" variant="ghost" mr={2}
                                            onClick={() => navigate(`../products/edit-product/${product._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="ghost"
                                            onClick={() => {
                                                setProductToDelete(category._id);
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
        </>
    )
}

export default ProductsTable