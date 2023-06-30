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
    useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm'

const CategoriesTable = ({ categories, handleCategoryAdded, deleteCategory }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const alertDialogState = useDisclosure();
    const [categoryToDelete, setCategoryToDelete] = useState(null);

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
            >Add Category</Button>
            <TableContainer h='100vh' mt={100} >
                <Table variant="striped">
                    <TableCaption>Categories Information</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Animal Type</Th>
                            <Th>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category) => (
                            <Tr key={category._id}>
                                <Td>{category.animal_type}</Td>
                                <Td>{category.name}</Td>
                                <Td>
                                    <Box d="flex" justifyContent="end">
                                        <Button leftIcon={<FiEdit2 />} colorScheme="teal" variant="ghost" mr={2}
                                            onClick={() => navigate(`../categories/edit-category/${category._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="ghost"
                                            onClick={() => {
                                                setCategoryToDelete(category._id);
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

            <AddCategoryForm isOpen={isOpen} onClose={onClose} handleCategoryAdded={handleCategoryAdded} />


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
                            Delete Category
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
                                    deleteCategory(categoryToDelete);
                                    setCategoryToDelete(null);
                                    alertDialogState.onClose();
                                }}
                            >
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent >
                </AlertDialogOverlay >
            </AlertDialog >
        </>
    )
}

export default CategoriesTable