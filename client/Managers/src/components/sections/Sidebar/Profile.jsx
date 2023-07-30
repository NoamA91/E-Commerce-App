import {
    Avatar,
    Divider,
    Flex,
    Heading,
    Text,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    useToast,
    AvatarBadge,
} from "@chakra-ui/react";
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext.AuthContext);
    const toast = useToast()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout();

            if (!response.success) {
                throw new Error(response.message);
            }

            // If logout was successful, display a success toast to the user
            toast({
                title: "Logout Successful",
                description: "You have been logged out successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Navigate to the login page
            navigate("/");

        } catch (error) {
            toast({
                title: "Logout Failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }


    return (
        <Flex
            p='5%'
            flexDir='column'
            w='100%'
            mb={4}
        >
            <Divider />
            <Flex mt={4} alignItems='center' maxW="270px">
                <Popover >
                    <PopoverTrigger>
                        <Button p={0} bg='transparent' _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }}>
                            <Avatar size='sm' bg='teal.500' cursor='pointer' >
                                <AvatarBadge
                                    boxSize='1.2em'
                                    bg='green.500'
                                    borderColor='white'
                                />
                            </Avatar>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        w="250px"
                        color="white.500"
                    >
                        <PopoverArrow />
                        <PopoverHeader>Press the Button to Logout</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <Flex flexDir='column' ml={2} >
                    <Heading as='h3' size='sm' color='white'>
                        {user.username}
                    </Heading>
                    <Text as='p' color='gray' fontSize='sm'>{user.email}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Profile;
