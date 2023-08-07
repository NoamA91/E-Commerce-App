import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Box, Text, Heading, Flex, Button, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderCompleted = () => {
    const [isConfettiActive, setIsConfettiActive] = useState(true);
    const confettiDuration = 9000;  // 2 seconds

    useEffect(() => {
        // Stop the confetti effect after a duration
        const timeout = setTimeout(() => {
            setIsConfettiActive(false);
        }, confettiDuration);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (

        <>
            <Box
                as={motion.div}
                initial={{ opacity: 0, delayChildren: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                minH='80vh'
                bg='gray.200'
            >
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    overflow="hidden"
                    minH='80vh'
                >

                    {isConfettiActive && (
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            numberOfPieces={500}
                            recycle={false}
                        />
                    )}

                    <Box
                        bg='whiteAlpha.900'
                        borderRadius={10}
                        maxW={700}
                        textAlign='center'
                        boxShadow={{ md: '0px 40px 60px rgba(0, 0, 0, 0.3)' }}
                    >
                        <Box p={5}>
                            <Heading as="h2" size="xl" marginBottom="1rem">
                                Order Completed!
                            </Heading>
                            <Text fontSize="lg">
                                Thank you for your purchase. Your order has been placed successfully. We hope you enjoy your items!
                            </Text>
                        </Box>
                        <Flex
                            flexDir={['column', 'row']}
                            gap={2}
                            justify='center'
                            alignItems='center'
                            p={5}
                        >
                            <Link to='/products'>
                                <Button
                                    colorScheme='teal'
                                    w={200}
                                    shadow='xl'
                                >
                                    Continue Shopping
                                </Button>
                            </Link>

                            <Link to='/orders'>
                                <Button
                                    colorScheme='teal'
                                    w={200}
                                    shadow='xl'
                                >
                                    My Orders
                                </Button>
                            </Link>
                        </Flex>
                        <Box
                            h={500}
                        >
                            <Image src={'/Thank-you.jpg'}
                                w='100%'
                                h='100%'
                                objectFit={{ base: 'cover', md: 'contain' }}
                            />
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default OrderCompleted;
