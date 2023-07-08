import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Stack,
    StackDivider,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Divider,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetailsComp = ({ order, deleteOrder }) => {
    const alertDialogState = useDisclosure();
    const navigate = useNavigate();
    const { order_id } = useParams();
    return (
        <>
            <Flex
                flexDir={'column'}
                p={10}
                minH='100vh'
            >
                <Card
                    shadow='md'
                    h='100%'
                    bg='whitesmoke'
                >
                    <CardHeader>
                        <Heading size='lg'>Order ID: {order.order_number}</Heading>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>

                            <Box mb={5} mt={5}>
                                <Heading color='teal.600' size='md' textTransform='uppercase'>
                                    customer details
                                </Heading>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Username:</Text> {order.userId.username}
                                </Text>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Email:</Text> {order.userId.email}
                                </Text>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Phone Number:</Text> {order.phone_number}
                                </Text>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Address:</Text> {order.address.street} {order.address.building} {order.address.city}
                                </Text>
                            </Box>

                            <Box mb={5}>
                                <Heading color='teal' size='md' textTransform='uppercase' mt={5}>
                                    Products
                                </Heading>
                                <Table
                                    variant="striped"
                                    colorScheme='blackAlpha'
                                    mt={2}
                                >
                                    <Thead>
                                        <Tr position='sticky'>
                                            <Th>Name</Th>
                                            <Th>Quantity</Th>
                                            <Th display={{ base: 'none', md: 'table-cell' }}>Item Price</Th>
                                            <Th>Total Price</Th>
                                            <Th display={{ base: 'none', md: 'table-cell' }}>Image</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {order.order_items.map((item) => {
                                            return (
                                                <Tr key={item.productId._id}>
                                                    <Td>{item.productId.title}</Td>
                                                    <Td>{item.quantity}</Td>
                                                    <Td display={{ base: 'none', md: 'table-cell' }}>{item.price}$</Td>
                                                    <Td>{item.item_total}$</Td>
                                                    <Td display={{ base: 'none', md: 'table-cell' }}>
                                                        <Image
                                                            src={item.productId.image}
                                                            alt={item.productId.title}
                                                            width='50px'
                                                        />
                                                    </Td>
                                                </Tr>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                                <Heading size='md' mt={3}>Total: {order.order_total}$</Heading>
                            </Box>

                            <Box>
                                <Heading color='teal' size='md' textTransform='uppercase' mt={5}>
                                    payment details
                                </Heading>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Terminal Number:</Text> {order.payment_details.terminal_number}
                                </Text>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Transaction Number:</Text> {order.payment_details.transaction_date}
                                </Text>
                                <Text mt={2} fontSize='md'>
                                    <Text textDecoration='underline' as='span'>Last Digits:</Text>
                                    <span> </span>XXXX-XXXX-XXXX-
                                    {order.payment_details.last_digits}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Flex justify={'end'} w='full'>
                            <Button
                                colorScheme='teal'
                                onClick={() => navigate("../")}
                                mr={3}
                            >Back</Button>
                            <Button

                                colorScheme={'red'}
                                onClick={() => {
                                    alertDialogState.onOpen();
                                }}
                            >
                                Delete Order
                            </Button>
                        </Flex>
                    </CardFooter>
                </Card>
            </Flex >


            <AlertDialog
                isOpen={alertDialogState.isOpen}
                onClose={() => { alertDialogState.onClose() }}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Order
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this order?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                colorScheme='red'
                                onClick={() => {
                                    deleteOrder(order_id)
                                    navigate("../")
                                }}
                            >
                                Yes
                            </Button>
                            <Button ml={3} onClick={alertDialogState.onClose}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default OrderDetailsComp