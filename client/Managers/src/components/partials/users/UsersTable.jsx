import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    Box,
    Button
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UsersTable = ({ users }) => {
    const navigate = useNavigate();

    return (
        <>
            <Button
                mt={10}
                colorScheme="teal"
                float='right'
                mr={10}
            >
                Add User
            </Button>
            <TableContainer h='100vh' w="full" mt={10}>
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
        </>

    );
};

export default UsersTable;
