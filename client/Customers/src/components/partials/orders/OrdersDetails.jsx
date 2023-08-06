import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Heading,
    Flex,
    Text,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect } from "react";

const OrdersDetails = ({ orders }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <Box
            minH='81vh'
            w='100%'
            bg='gray.100'
        >
            <Flex
                as={motion.div}
                flexDir='column'
                w='100%'
                h='100%'
                px={{ md: '20%' }}
                pb={20}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delayChildren: 0.3 }}
                exit={{ opacity: 0 }}
            >
                <Heading
                    as='h1'
                    textAlign='center'
                    py={9}
                >
                    My Orders
                </Heading>

                {orders.length === 0 ? (
                    <Text
                        textAlign='center'
                        mt={5}
                        fontSize='xl'
                    >
                        No orders have been made yet.
                    </Text>
                ) : (
                    <Accordion
                        allowToggle
                    >
                        {orders.map((order) => (
                            <AccordionItem key={order._id}>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left" overflowX={{ base: 'scroll', md: 'auto' }}>
                                        <Table variant="simple">
                                            <Thead bg='gray.200'>
                                                <Tr>
                                                    <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                        Order Number
                                                    </Th>
                                                    <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                        Date
                                                    </Th>
                                                    <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                        Total
                                                    </Th>
                                                    <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                        Status
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>{order.order_number}</Td>
                                                    <Td>{new Date(order.order_date).toLocaleDateString()}</Td>
                                                    <Td>${order.order_total}</Td>
                                                    <Td textTransform='capitalize'>{order.status}</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                    Image
                                                </Th>
                                                <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                    Name
                                                </Th>
                                                <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                    Quantity
                                                </Th>
                                                <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                    Item Price
                                                </Th>
                                                <Th fontSize={{ base: '0.7rem', md: 'xs' }}>
                                                    Total Price
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {order.order_items.map((item) => (
                                                <Tr key={item._id}>
                                                    <Td>
                                                        <Image
                                                            boxSize="100px"
                                                            objectFit="cover"
                                                            src={item.productId?.image[0]}
                                                            alt={item.productId?.title}
                                                        />
                                                    </Td>
                                                    <Td>{item.productId?.title}</Td>
                                                    <Td>{item.quantity}</Td>
                                                    <Td>${item.price}</Td>
                                                    <Td>${item.item_total}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </Flex>
        </Box>
    )
}

export default OrdersDetails