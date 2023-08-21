import {
    Box,
    Button,
    Input,
    Text,
    Textarea,
    VStack,
    Heading,
    FormControl,
    Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>PetShop | Contact Us</title>
                <meta name="description" content="Contact page" />
            </Helmet>
            <Flex
                as={motion.div}
                bg='url(/pexels-arijit-dey-15375963.jpg)'
                bgSize='cover'
                minH='100vh'
                w='100%'
                flexDir='column'
                alignItems='center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delayChildren: 0.3 }}
                exit={{ opacity: 0 }}
            >
                <Box
                    mt={{ base: 5, md: 120 }}
                    w={{ base: '90%', md: '60%', lg: '40%' }}
                    bg='whiteAlpha.800'
                    p={5}
                    borderRadius={10}
                >
                    <Heading
                        as='h1'
                        size={{ base: 'md', md: 'xl' }}
                        textAlign='center'
                        mb={5}
                    >
                        Contact Us
                    </Heading>
                    <Text
                        fontSize={{ base: 'sm', md: 'lg' }}
                        textAlign='center'
                        mb={5}
                    >
                        Your opinion matters to us. The feedback we receive helps us with our continuous development of our products and the service we offer, so if you’d like to get in touch with us we’d be happy to hear from you.
                    </Text>
                    <VStack spacing={5}>
                        <FormControl id='name' isRequired>
                            <Input
                                placeholder='Full Name'
                                focusBorderColor='teal'
                                type='text'
                                size={{ base: 'md', md: 'lg' }}
                                bg='whiteAlpha.500'
                            />
                        </FormControl>
                        <FormControl id='email' isRequired>
                            <Input
                                placeholder='Email'
                                focusBorderColor='teal'
                                type='email'
                                size={{ base: 'md', md: 'lg' }}
                                bg='whiteAlpha.500'
                            />
                        </FormControl>

                        <FormControl id='phone' isRequired>
                            <Input
                                placeholder='Phone Number'
                                focusBorderColor='teal'
                                type='tel'
                                size={{ base: 'md', md: 'lg' }}
                                bg='whiteAlpha.500'
                            />
                        </FormControl>

                        <FormControl id='message' isRequired>
                            <Textarea
                                placeholder='Your Message'
                                focusBorderColor='teal'
                                size={{ base: 'md', md: 'lg' }}
                                maxH='300px'
                                bg='whiteAlpha.500'
                            />
                        </FormControl>

                        <Button
                            size={{ base: 'md', md: 'lg' }}
                            colorScheme='teal'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </VStack>
                </Box>
            </ Flex>
        </>
    )
}

export default Contact;
