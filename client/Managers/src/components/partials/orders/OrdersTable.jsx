import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Select,
    Flex,
    HStack,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { FiChevronUp, FiChevronDown, FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OrdersTable = ({ orders, changeStatus }) => {
    const [sort, setSort] = useState("ASC");
    const [sortColumn, setSortColumn] = useState("");
    const [dataOrders, setDataOrders] = useState(orders);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const [filteredStatus, setFilteredStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");


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
            let compareA, compareB;
            if (col === 'username') {
                compareA = a.userId[col];
                compareB = b.userId[col];
            } else if (col === 'address') {
                compareA = `${a.address.street} ${a.address.building} ${a.address.city}`;
                compareB = `${b.address.street} ${b.address.building} ${b.address.city}`;
            } else {
                compareA = nested ? a.customer_details[col] : a[col];
                compareB = nested ? b.customer_details[col] : b[col];
            }

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
                <Flex
                    mt={10}
                    justifyContent='space-between'
                >
                    <Flex
                        ml={10}
                        gap={2}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Button
                            shadow='md'
                            w={'100px'}
                            onClick={() => setFilteredStatus('all')}
                            colorScheme={filteredStatus === 'all' ? 'teal' : 'whiteAlpha'}
                            color={filteredStatus === 'all' ? 'white' : 'black'}
                        >
                            All
                        </Button>
                        <Button
                            shadow='md'
                            w={'100px'}
                            onClick={() => setFilteredStatus('new')}
                            colorScheme={filteredStatus === 'new' ? 'teal' : 'whiteAlpha'}
                            color={filteredStatus === 'new' ? 'white' : 'black'}
                        >
                            New
                        </Button>
                        <Button
                            shadow='md'
                            w={'100px'}
                            onClick={() => setFilteredStatus('processing')}
                            colorScheme={filteredStatus === 'processing' ? 'teal' : 'whiteAlpha'}
                            color={filteredStatus === 'processing' ? 'white' : 'black'}
                        >
                            Processing
                        </Button>
                        <Button
                            shadow='md'
                            w={'100px'}
                            onClick={() => setFilteredStatus('done')}
                            colorScheme={filteredStatus === 'done' ? 'teal' : 'whiteAlpha'}
                            color={filteredStatus === 'done' ? 'white' : 'black'}
                        >
                            Done
                        </Button>
                        <Button
                            shadow='md'
                            w={'100px'}
                            onClick={() => setFilteredStatus('canceled')}
                            colorScheme={filteredStatus === 'canceled' ? 'teal' : 'whiteAlpha'}
                            color={filteredStatus === 'canceled' ? 'white' : 'black'}
                        >
                            Canceled</Button>
                    </Flex>

                    <Flex ml={2}>
                        <Select
                            size='sm'
                            variant='filled'
                            w='-webkit-max-content'
                            shadow='md'
                            value={filteredStatus}
                            display={{ base: 'flex', md: 'none' }}
                            onChange={(e) => setFilteredStatus(e.target.value)}
                        >
                            <option value='all'>All</option>
                            <option value='new'>New</option>
                            <option value='processing'>Processing</option>
                            <option value='done'>Done</option>
                            <option value='canceled'>Canceled</option>
                        </Select>
                    </Flex>

                    <Flex
                        mr={{ base: 0, md: 10 }}
                    >
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FiSearch color='gray.300' />
                            </InputRightElement>
                            <Input
                                size={{ base: 'sm', md: 'md' }}
                                width={{ base: '300px]', md: '350px' }}
                                variant='filled'
                                placeholder='Search'
                                shadow='md'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Flex>
                </Flex>


                <TableContainer h='100vh' mt={50}>
                    <Text ml={4} mb={5}>Total Orders: {dataOrders.length}</Text>
                    <Table
                        variant="striped"
                        size={{ base: 'sm', md: 'md' }}
                    >
                        <TableCaption>Users Information</TableCaption>
                        <Thead>
                            <Tr>
                                <Th
                                    onClick={() => sorting('order_number', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >
                                    <HStack>
                                        <Text>Order Number</Text>
                                        {sortColumn === 'order_number' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    display={{ base: 'none', sm: 'table-cell' }}
                                    onClick={() => sorting('order_date', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >
                                    <HStack>
                                        <Text>Order Date</Text>
                                        {sortColumn === 'order_date' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    onClick={() => sorting('username', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >
                                    <HStack>
                                        <Text>Username</Text>
                                        {sortColumn === 'username' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>

                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('phone_number', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >
                                    <HStack>
                                        <Text>Phone Number</Text>
                                        {sortColumn === 'phone_number' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>

                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('address', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >
                                    <HStack>
                                        <Text>Address</Text>
                                        {sortColumn === 'address' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    display={{ base: 'none', md: 'table-cell' }}
                                    onClick={() => sorting('order_total', false)}
                                    _hover={{ bg: 'gray.300' }}
                                    cursor='pointer'
                                    sx={{ userSelect: "none" }}
                                >

                                    <HStack>
                                        <Text>Total</Text>
                                        {sortColumn === 'order_total' && (sort === 'ASC' ? <FiChevronUp /> : <FiChevronDown />)}
                                    </HStack>
                                </Th>
                                <Th
                                    _hover={{ bg: 'gray.300' }}
                                    sx={{ userSelect: "none" }}
                                >
                                    Status
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dataOrders
                                .filter(order => filteredStatus === 'all' || order.status === filteredStatus)
                                .filter(order => {
                                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                                    return (
                                        order.order_number.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
                                        order.userId.username.toLowerCase().includes(lowerCaseSearchTerm) ||
                                        order.phone_number.includes(searchTerm) ||
                                        (`${order.address.street} ${order.address.building} ${order.address.city}`).toLowerCase().includes(lowerCaseSearchTerm)
                                    );
                                })
                                .map((order) => (
                                    <Tr key={order._id}>
                                        <Td
                                            color="blueviolet"
                                            _hover={{
                                                textDecor: "underline"
                                            }}
                                        >
                                            <Link
                                                to={`order-details/${order._id}`}
                                            >
                                                {order.order_number}

                                            </Link>
                                        </Td>
                                        <Td display={{ base: 'none', sm: 'table-cell' }}>{new Date(order.order_date).toLocaleString("en-UK")}</Td>
                                        <Td>{order.userId.username}</Td>
                                        <Td display={{ base: 'none', md: 'table-cell' }}>{order.phone_number}</Td>
                                        <Td display={{ base: 'none', md: 'table-cell' }}>{order.address.street} {order.address.building} {order.address.city}</Td>
                                        <Td display={{ base: 'none', md: 'table-cell' }}>{order.order_total}$</Td>
                                        <Td>
                                            <Select
                                                shadow='inner'
                                                value={order.status}
                                                w='-webkit-max-content'
                                                variant='outline'
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
                                                <option value='canceled'>Canceled</option>
                                            </Select>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer >
            </Flex >


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