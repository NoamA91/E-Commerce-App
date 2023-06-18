// import { Avatar } from "@chakra-ui/avatar"
// import { Divider, Flex, Heading, Text } from "@chakra-ui/layout"


// const Profile = () => {
//     return (
//         <Flex
//             p='5%'
//             flexDir='column'
//             w='100%'
//             mb={4}
//         >
//             <Divider />
//             <Flex mt={4} alignItems='center'>
//                 <Avatar size='sm' bg='teal.500' />
//                 <Flex flexDir='column' ml={4} >
//                     <Heading as='h3' size='sm' color='white'>
//                         User Name
//                     </Heading>
//                     <Text as='p' color='grey'>Role</Text>
//                 </Flex>
//             </Flex>
//         </Flex>
//     )
// }

// export default Profile

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
    useToast
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
            <Flex mt={4} alignItems='center'>
                <Popover >
                    <PopoverTrigger>
                        <Button p={0} bg='transparent' _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }}>
                            <Avatar size='sm' bg='teal.500' cursor='pointer' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Press the Button to Logout</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                <Flex flexDir='column' ml={4} >
                    <Heading as='h3' size='sm' color='white'>
                        {user.username}
                    </Heading>
                    <Text as='p' color='grey'>Role: {user.role}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Profile;
