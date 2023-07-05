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
    Select,
    Flex,
    Badge,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiLoader } from 'react-icons/fi';

const OrdersTable = ({ orders, changeStatus }) => {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState(null);

    const handleStatusChange = (orderId, status) => {
        setSelectedOrder(orderId);
        setNewStatus(status);
        setOpenAlertDialog(true);
    };

    const handleConfirmStatusChange = () => {
        changeStatus(selectedOrder, newStatus);
        setOpenAlertDialog(false);
    };

    return (
        <>
            <Flex
                flexDir={'column'}
            >
                <TableContainer h='100vh' mt={{ base: 70, md: 120 }}>
                    <Table variant="striped">
                        <TableCaption>Users Information</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Order Number</Th>
                                <Th display={{ base: 'none', sm: 'table-cell' }}>Order Date</Th>
                                <Th>Username</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Phone Number</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Address</Th>
                                <Th display={{ base: 'none', md: 'table-cell' }}>Total</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((order) => (
                                <Tr key={order._id}>
                                    <Td>{order.order_number}</Td>
                                    <Td display={{ base: 'none', sm: 'table-cell' }}>{new Date(order.order_date).toLocaleString("en-US")}</Td>
                                    <Td>{order.userId.username}</Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>{order.phone_number}</Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>{order.address.street} {order.address.building} {order.address.city}</Td>
                                    <Td display={{ base: 'none', md: 'table-cell' }}>{order.order_total}$</Td>
                                    <Td>
                                        <Select
                                            value={order.status}
                                            icon={
                                                order.status === "new" ? <FiLoader /> : <FiLoader />
                                                // 
                                                // : order.status === "processing"
                                                //     ? "purple.100"
                                                //     : order.status === "done"
                                                //         ? "green.100"
                                                //         : "blackAlpha.100"
                                            }
                                            w='-webkit-max-content'
                                            bg={
                                                order.status === "new"
                                                    ? "orange.100"
                                                    : order.status === "processing"
                                                        ? "purple.100"
                                                        : order.status === "done"
                                                            ? "green.100"
                                                            : "blackAlpha.100"
                                            }
                                            onChange={(e) => {
                                                handleStatusChange(order._id, e.target.value)
                                            }}
                                        >
                                            <option value='new'>New</option>
                                            <option value='processing'>Processing</option>
                                            <option value='done'>Done</option>
                                            <option value='cancelled'>Cancelled</option>
                                        </Select>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer >
            </Flex>


            <AlertDialog
                isOpen={openAlertDialog}
                onClose={() => setOpenAlertDialog(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Change Status
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to change the status of this order?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => setOpenAlertDialog(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme='teal' ml={3} onClick={handleConfirmStatusChange}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default OrdersTable