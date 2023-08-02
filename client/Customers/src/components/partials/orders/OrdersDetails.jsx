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
    VStack,
    useDisclosure,
    Heading,
    Flex,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const OrdersDetails = ({ orders }) => {
    console.log(orders);
    return (
        <Box
            as={motion.div}
            minH='100vh'
            w='100%'
            bg='gray.100'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delayChildren: 0.3 }}
            exit={{ opacity: 0 }}
        >
            <Flex
                flexDir='column'
                w='100%'
                h='100%'
                px='20%'
                pb={20}
            >
                <Heading
                    as='h1'
                    textAlign='center'
                    py={9}
                >
                    My Orders
                </Heading>

                <Accordion
                    allowToggle
                >
                    {orders.map((order) => (
                        <AccordionItem key={order._id}>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Table variant="simple">
                                        <Thead bg='gray.200'>
                                            <Tr>
                                                <Th>Order Number</Th>
                                                <Th>Date</Th>
                                                <Th>Total</Th>
                                                <Th>Status</Th>
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
                                            <Th>Image</Th>
                                            <Th>Name</Th>
                                            <Th>Quantity</Th>
                                            <Th>Item Price</Th>
                                            <Th>Total Price</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {order.order_items.map((item) => (
                                            <Tr key={item._id}>
                                                <Td>
                                                    <Image
                                                        boxSize="100px"
                                                        objectFit="cover"
                                                        src={item.productId.image[0]}
                                                        alt={item.productId.title}
                                                    />
                                                </Td>
                                                <Td>{item.productId.title}</Td>
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
            </Flex>
        </Box>
    )
}

export default OrdersDetails
