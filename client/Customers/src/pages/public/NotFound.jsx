import { Heading, Text, Button, Center, VStack, ButtonGroup, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Center h="80vh" flexDirection="column" bgColor="gray.100">
            <VStack spacing={4}>
                <Image
                    w={150}
                    src='/fox.png'
                    alt='No products found'
                />
                <Heading color="red.500" size="4xl">404</Heading>
                <Text fontSize="xl" fontWeight="medium">Oops! Page Not Found</Text>
                <ButtonGroup>
                    <Link onClick={() => navigate(-1)}>
                        <Button colorScheme="red" >Back</Button>
                    </Link>
                    <Link to='/'>
                        <Button colorScheme="red" >Go Home</Button>
                    </Link>
                </ButtonGroup>
            </VStack>
        </Center>
    )
}

export default NotFound;