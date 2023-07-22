import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    VStack,
    Text,
    Badge,
    Stack,
    HStack
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion'
import { PiBasketFill } from 'react-icons/pi';

const ShoppingCart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const { cart } = useContext(CartContext);

    const totalItems = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    const subtotal = cart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

    return (
        <Box>
            <motion.div
                whileHover={{ scale: 1.050 }}
                whileTap={{ scale: 0.980 }}
            >
                <Button
                    size={{ base: 'sm', md: 'md', lg: 'lg' }}
                    color='ShopTeal.200'
                    _hover={{
                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                        color: 'blackAlpha.900',
                    }}
                    onClick={onOpen}
                    ref={btnRef}
                >
                    <Text mr={3}>Cart</Text>
                    <Stack position='relative'>
                        <PiBasketFill size={30} />
                        <Badge
                            position='absolute'
                            bottom='3'
                            left='5'
                            fontSize='0.9em'
                            colorScheme='yellow'
                        >{totalItems}
                        </Badge>
                    </Stack>
                </Button>
            </motion.div>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size='md'
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Cart ({totalItems} items)</DrawerHeader>

                        <DrawerBody>
                            {/* Render your cart items here */}
                        </DrawerBody>

                        <DrawerFooter
                            display='flex'
                            justifyContent='space-between'
                            gap={16}
                        >
                            <HStack>
                                <Button
                                    variant='solid'
                                    colorScheme='teal'
                                    mr={{ base: 0, md: 3 }}
                                    onClick={onClose}
                                    size='md'
                                >
                                    Checkout
                                </Button>
                                <Button
                                    colorScheme='red'
                                    size={{ base: 'sm', md: 'md' }}
                                >
                                    Clear Cart
                                </Button>
                            </HStack>
                            <Text
                                // mr={3}
                                fontSize={{ base: '1em', md: '1.2em' }}
                                fontWeight='bold'
                            >
                                Subtotal: ${subtotal.toFixed(2)}
                            </Text>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Box>
    );
}

export default ShoppingCart;