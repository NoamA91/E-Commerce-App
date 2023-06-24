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
} from '@chakra-ui/react';
import { FiChevronDown, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddUserForm from './AddUserForm';
import { useDisclosure } from '@chakra-ui/react';

const UsersTable = ({ users, handleUserAdded }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="teal"
                    rightIcon={<FiChevronDown />}
                    mt={10}
                    float='right'
                    mr={10}
                >
                    Actions
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpen}>Add User</MenuItem>
                    <MenuItem>Add Manager</MenuItem>
                </MenuList>
            </Menu>
            <TableContainer h='100vh' w="full" mt={100}>
                <Table variant="striped">
                    <TableCaption>Users Information</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Phone Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user) => (
                            <Tr key={user._id}>
                                <Td>{user.username}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.phone_number}</Td>
                                <Td>
                                    <Box d="flex" justifyContent="end">
                                        <Button leftIcon={<FiEdit2 />} colorScheme="teal" variant="ghost" mr={2}
                                            onClick={() => navigate(`../users/edit-user/${user._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button leftIcon={<FiTrash2 />} colorScheme="red" variant="ghost">
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
        </>

    );
};

export default UsersTable;
