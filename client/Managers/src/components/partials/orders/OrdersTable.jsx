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
    Select
} from '@chakra-ui/react';
import React from 'react'

const OrdersTable = ({ orders }) => {

    console.log(orders);


    return (
        <>




            <TableContainer h='100vh' mt={{ base: 70, md: 120 }}>
                <Table variant="striped">
                    <TableCaption>Users Information</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Order Number</Th>
                            <Th>Oeder Date</Th>
                            <Th>Username</Th>
                            <Th>Phone Number</Th>
                            <Th>Address</Th>
                            <Th>Total</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order._id}>
                                <Td isTruncated maxW="200px">{order.order_number}</Td>
                                <Td isTruncated maxW="200px">
                                    {new Date(order.order_date).toLocaleString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric",
                                    })}
                                </Td>
                                <Td isTruncated maxW="200px">{order.userId.username}</Td>
                                <Td isTruncated maxW="200px" display={{ base: 'none', md: 'table-cell' }}>{order.phone_number}</Td>
                                <Td>
                                    <span>{order.address.street}</span>{" "},
                                    <span>{order.address.building}</span>{" "},
                                    <span>{order.address.city}</span>
                                </Td>
                                <Td isTruncated maxW="200px" display={{ base: 'none', md: 'table-cell' }}>{order.order_total}$</Td>
                                <Td>
                                    <Select>
                                        <option>New</option>
                                        <option>Proccessing</option>
                                        <option>Done</option>
                                        <option>Cancelled</option>
                                    </Select>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer >
        </>
    )
}

export default OrdersTable