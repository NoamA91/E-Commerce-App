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
    AlertDialogFooter
} from '@chakra-ui/react';
import { FiChevronDown, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddUserForm from './AddUserForm';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const UsersTable = ({ users, handleUserAdded, deleteUser }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const alertDialogState = useDisclosure();
    const [userToDelete, setUserToDelete] = useState(null);

    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="teal"
                    rightIcon={<FiChevronDown />}
                    mt={{ base: 5, md: 10 }}
                    float='right'
                    mr={{ base: 5, md: 10 }}
                >
                    Actions
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpen}>Add User</MenuItem>
                    <MenuItem>Add Manager</MenuItem>
                </MenuList>
            </Menu>
            <TableContainer h='100vh' mt={{ base: 70, md: 120 }}>
                <Table variant="striped">
                    <TableCaption>Users Information</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>Phone Number</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>City</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>Street</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user._id}>
                                <Td isTruncated maxW="200px">{user.username}</Td>
                                <Td isTruncated maxW="200px">{user.email}</Td>
                                <Td isTruncated maxW="200px" display={{ base: 'none', md: 'table-cell' }}>{user.phone_number}</Td>
                                <Td isTruncated maxW="200px" display={{ base: 'none', md: 'table-cell' }}>{user.address.city}</Td>
                                <Td isTruncated maxW="200px" display={{ base: 'none', md: 'table-cell' }}>{user.address.street}</Td>
                                <Td p={{ base: '2px 0', md: '16px 14px' }}>
                                    <Box display="flex" flexDir={{ base: 'column', md: 'row' }}>
                                        <Button leftIcon={<FiEdit2 />} colorScheme="teal" variant="ghost" mr={2}
                                            onClick={() => navigate(`../users/edit-user/${user._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="ghost"
                                            onClick={() => {
                                                setUserToDelete(user._id);
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

            <AddUserForm isOpen={isOpen} onClose={onClose} handleUserAdded={handleUserAdded} />


            <AlertDialog
                isOpen={alertDialogState.isOpen}
                onClose={() => {
                    setUserToDelete(null);
                    alertDialogState.onClose();
                }}
            >
                <AlertDialogOverlay backdropFilter='blur(1px)'>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                colorScheme='red'
                                onClick={() => {
                                    deleteUser(userToDelete);
                                    setUserToDelete(null);
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
        </>
    );
};

export default UsersTable;
