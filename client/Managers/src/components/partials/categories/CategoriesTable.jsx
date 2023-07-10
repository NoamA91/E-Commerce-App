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
    Flex,
    Container
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
            <Flex flexDir='column'>

                <Box>
                    <Button
                        colorScheme='teal'
                        shadow='md'
                        p='4'
                        leftIcon={<FiPlusCircle fontSize={25} />}
                        mt={{ base: 5, md: 10 }}
                        float='right'
                        mr={{ base: 5, md: 10 }}
                        onClick={onOpen}
                    >Add Category</Button>
                </Box>

                <Container maxW='container.md' bg=''>
                    <TableContainer h='100vh' mt={10} >
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
                                            <Box display="flex" flexDir={{ base: 'column', md: 'row' }} justifyContent='end'>
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
                </Container>

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
                                <Button
                                    colorScheme='red'

                                    onClick={() => {
                                        deleteCategory(categoryToDelete);
                                        setCategoryToDelete(null);
                                        alertDialogState.onClose();
                                    }}
                                >
                                    Yes
                                </Button>
                                <Button ml={3} onClick={alertDialogState.onClose}>
                                    Cancel
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent >
                    </AlertDialogOverlay >
                </AlertDialog >
            </Flex>
        </>
    )
}

export default CategoriesTable