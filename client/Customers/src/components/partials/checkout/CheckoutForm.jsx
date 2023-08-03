// import {
//     Box,
//     Button,
//     Flex,
//     Heading,
//     Text,
// } from '@chakra-ui/react'
// import { motion } from 'framer-motion';
// import { useEffect } from 'react';

// const CheckoutForm = ({ values, handleChange }) => {

//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }, []);


//     return (

//         <Box
//             as={motion.div}
//             initial={{ opacity: 0, delayChildren: 0.3 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             minW={{ base: "90%", md: "35%" }}
//             minH='85vh'
//             bg='gray.200'
//         >

//             <Heading
//                 textAlign='center'
//                 py={5}
//             >
//                 CHECKOUT
//             </Heading>


//             <Flex
//                 flexDir={['column', 'column', 'row']}
//             >
//                 <Flex
//                     flexDir='column'
//                     gap={5}
//                 >

//                     <Box
//                         bg='whiteAlpha.700'
//                         boxShadow='md'
//                         minH='300px'
//                     >
//                         <Heading size='lg'>Delivery Address</Heading>
//                     </Box>

//                     <Box
//                         bg='whiteAlpha.700'
//                         boxShadow='md'
//                         minH='300px'
//                     >
//                         <Heading size='lg'>Payment</Heading>
//                     </Box>

//                 </Flex>

//                 <Box
//                     bg='whiteAlpha.700'
//                     boxShadow='md'
//                 >
//                     <Text>order summary</Text>
//                 </Box>
//             </Flex>

//             <Button
//                 mt={5}
//                 colorScheme='teal'
//             >
//                 Place Order
//             </Button>
//         </Box>
//     )
// }

// export default CheckoutForm


import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const CheckoutForm = ({ values, handleChange }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <Box
            as={motion.div}
            initial={{ opacity: 0, delayChildren: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            minH='85vh'
            bg='gray.200'
        >

            <Heading
                textAlign='center'
                py={5}
            >
                CHECKOUT
            </Heading>

            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                mx="auto"
                width={{ base: "90%", md: "80%", lg: "70%" }}
            >
                <Flex
                    direction='column'
                    width={{ base: "100%", md: "60%" }}
                >
                    <Box
                        bg='whiteAlpha.700'
                        boxShadow='md'
                        p={4}
                        mb={4}
                        minH={'300px'}
                    >
                        <Heading size='md'>Delivery Address</Heading>
                        {/* Add your form fields for the delivery address here */}
                    </Box>

                    <Box
                        bg='whiteAlpha.700'
                        boxShadow='md'
                        p={4}
                        minH={'300px'}
                    >
                        <Heading size='md'>Payment</Heading>
                        {/* Add your form fields for the payment details here */}
                    </Box>
                </Flex>

                <Box
                    width={{ base: "100%", md: "35%" }}
                >
                    <Box
                        bg='whiteAlpha.700'
                        boxShadow='md'
                        p={4}
                        mt={{ base: 4, md: 0 }}
                        minH={'400px'}
                    >
                        <Heading size='md'>Order Summary</Heading>
                        {/* Add your order summary details here */}

                    </Box>
                    <Button
                        mt={5}
                        colorScheme='teal'
                        width="100%"
                    >
                        Place Order
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default CheckoutForm
