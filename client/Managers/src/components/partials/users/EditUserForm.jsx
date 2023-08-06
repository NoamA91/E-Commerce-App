import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    VStack,
    Box,
    Button,
    useToast,
    Container,
    Heading
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditUserForm = ({ user }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const {
        username,
        email,
        phone_number
    } = user;

    const [values, setValues] = useState({
        username,
        email,
        phone_number: phone_number || '',
        address: user?.address ? {
            city: user.address?.city || '',
            street: user.address?.street || '',
            building: user.address?.building || '',
            apartment: user.address?.apartment || ''
        } : {
            city: '',
            street: '',
            building: '',
            apartment: ''
        }
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            // Update nested address values
            const addressField = name.split(".")[1];
            setValues((prevValues) => ({
                ...prevValues,
                address: {
                    ...prevValues.address,
                    [addressField]: value,
                },
            }));
        } else {
            // Update other values
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/users/managers/updateUserByIdForManager/${user._id}`,
                values,
            )


            toast({
                title: 'Edit User',
                description: "User details updated successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("../");

        } catch (error) {
            toast({
                title: error.response.data.message ? error.response.data.message : 'Error',
                description: error.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Heading as='h3' textAlign='center' my={10}>Edit User</Heading>
            <Box h='100vh' >
                <Container maxW='xl'>
                    <Box as='form' bg='white' p={8} onSubmit={handleSubmit} borderRadius={8} boxShadow='md' >
                        <Flex>
                            <VStack width='full' mr={50}>
                                <FormControl id='username' pb={4} isRequired>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Input
                                        placeholder='Enter username'
                                        value={values.username}
                                        name='username'
                                        onChange={handleChange}
                                        type='text'
                                    />
                                </FormControl>

                                <FormControl id="email" pb={4} isRequired>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        placeholder='Enter user email'
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        type="email"
                                    />
                                </FormControl>

                                <FormControl id="phone_number" pb={4}>
                                    <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                                    <Input
                                        placeholder='Enter user phone number'
                                        value={values.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>
                            </VStack>

                            <VStack width='full'>
                                <FormControl id="city" pb={4}>
                                    <FormLabel htmlFor="city">City</FormLabel>
                                    <Input
                                        placeholder='Enter user city'
                                        value={values.address.city}
                                        name="address.city"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>

                                <FormControl id="street" pb={4}>
                                    <FormLabel htmlFor="street">Street</FormLabel>
                                    <Input
                                        placeholder='Enter user street'
                                        value={values.address.street}
                                        name="address.street"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>

                                <FormControl id="building" pb={4}>
                                    <FormLabel htmlFor="building">Building</FormLabel>
                                    <Input
                                        placeholder='Enter user building'
                                        value={values.address.building}
                                        name="address.building"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>

                                <FormControl id="apartment" pb={4}>
                                    <FormLabel htmlFor="apartment">Apartment</FormLabel>
                                    <Input
                                        placeholder='Enter user apartment'
                                        value={values.address.apartment}
                                        name="address.apartment"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>
                            </VStack>
                        </Flex>

                        <Button type='submit' mr={3} isLoading={loading} colorScheme={loading ? 'gray' : 'teal'}>
                            Update
                        </Button>
                        <Button onClick={() => navigate("../")}>Back</Button>
                    </Box>
                </Container>
            </Box >
        </>
    )
}

export default EditUserForm