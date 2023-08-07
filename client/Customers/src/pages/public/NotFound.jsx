import {
    Heading,
    Text,
    Button,
    Center,
    VStack,
    ButtonGroup,
    Image,
    Box
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>PetShop | Not Found</title>
                <meta name='description' content='Not found page' />
            </Helmet>
            <Box
                as={motion.div}
                bg='radial-gradient(circle, rgba(255,220,145,0.9164040616246498) 12%, rgba(0,185,164,0.742734593837535) 66%, rgba(237,237,237,1) 98%)'
                w='100%'
                h='100%'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Center h='80vh' flexDirection='column' >
                    <VStack spacing={4}>
                        <Image
                            w={150}
                            src='/fox.png'
                            alt='No products found'
                        />
                        <Heading color='red.500' size='4xl'>404</Heading>
                        <Text fontSize='xl' fontWeight='medium'>Oops! Page Not Found</Text>
                        <ButtonGroup>
                            <Link onClick={() => navigate(-1)}>
                                <Button colorScheme='red' >Back</Button>
                            </Link>
                            <Link to='/'>
                                <Button colorScheme='red' >Go to Home</Button>
                            </Link>
                        </ButtonGroup>
                    </VStack>
                </Center>
            </Box>
        </>
    )
}

export default NotFound;