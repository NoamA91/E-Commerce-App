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
    useDisclosure,
    HStack,
    Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const OrdersTable = ({ orders, changeStatus }) => {
    const [sort, setSort] = useState("ASC");
    const [sortColumn, setSortColumn] = useState("");
    const [dataOrders, setDataOrders] = useState(orders);
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

    const sorting = (col, nested = false) => {
        setSortColumn(col);
        let nextSort = sort === "ASC" ? "DESC" : "ASC";
        const sorted = [...dataOrders].sort((a, b) => {
            let compareA = nested ? a.customer_details[col] : a[col];
            let compareB = nested ? b.customer_details[col] : b[col];
            if (typeof compareA === "string") {
                return nextSort === "ASC"
                    ? compareA.localeCompare(compareB)
                    : compareB.localeCompare(compareA);
            } else {
                return nextSort === "ASC"
                    ? compareA > compareB
                        ? 1
                        : -1
                    : compareA > compareB
                        ? -1
                        : 1;
            }
        });
        setDataOrders(sorted);
        setSort(nextSort);
    };


    useEffect(() => {
        setDataOrders(orders);
    }, [orders]);

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
                                <Th
                                    onClick={() => sorting('order_number', false)}
                                >
                                    <HStack>
                                        <Text>Order Number</Text>
                                        {sortColumn === 'order_number' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    display={{ base: 'none', sm: 'table-cell' }}
                                    onClick={() => sorting('order_date', false)}
                                >
                                    <HStack>
                                        <Text>Order Date</Text>
                                        {sortColumn === 'order_date' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    onClick={() => sorting('username', false)}
                                >
                                    <HStack>
                                        <Text>Username</Text>
                                        {sortColumn === 'username' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>

                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('phone_number', false)}
                                >
                                    <HStack>
                                        <Text>Phone Number</Text>
                                        {sortColumn === 'phone_number' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>

                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('address', false)}
                                >
                                    <HStack>
                                        <Text>Address</Text>
                                        {sortColumn === 'address' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('order_total', false)}
                                >

                                    <HStack>
                                        <Text>Total</Text>
                                        {sortColumn === 'order_total' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    onClick={() => sorting('order_status', false)}
                                >
                                    <HStack>
                                        <Text>Status</Text>
                                        {sortColumn === 'order_status' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dataOrders.map((order) => (
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