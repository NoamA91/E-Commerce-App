import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Flex,
    VStack,
    Box,
    ModalFooter,
    Button,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

const AddUserForm = ({ isOpen, onClose, handleUserAdded }) => {
    const toast = useToast();
    const [values, setValues] = useState({
        username: "",
        password: "",
        password_confirm: "",
        email: "",
        phone_number: "",
        address: {
            city: "",
            street: "",
            building: "",
            appartment: ""
        }
    });

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


    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/managers/addUserForManager`,
                values,
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            handleUserAdded(response.data.new_user);

            toast({
                title: 'Add User',
                description: "User added successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setValues({
                username: "",
                password: "",
                password_confirm: "",
                email: "",
                phone_number: "",
                address: {
                    city: "",
                    street: "",
                    building: "",
                    appartment: ""
                }
            })

            onClose();
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
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay bg='blackAlpha.500' backdropFilter='blur(1px)' />
            <ModalContent>
                <ModalHeader>Add User Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Box as='form' onSubmit={handleSubmit} >
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

                                <FormControl id="password" pb={4} isRequired>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input
                                        placeholder='Enter user password'
                                        value={values.password}
                                        name="password"
                                        onChange={handleChange}
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </FormControl>

                                <FormControl id="password_confirm" pb={4} isRequired>
                                    <FormLabel htmlFor="password_confirm">Confirm Password</FormLabel>
                                    <Input
                                        placeholder='Enter the password again'
                                        value={values.password_confirm}
                                        name="password_confirm"
                                        onChange={handleChange}
                                        type="password"
                                        autoComplete="new-password"
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

                                <FormControl id="appartment" pb={4}>
                                    <FormLabel htmlFor="appartment">Appartment</FormLabel>
                                    <Input
                                        placeholder='Enter user appartment'
                                        value={values.address.appartment}
                                        name="address.appartment"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>
                            </VStack>
                        </Flex>
                        <ModalFooter>
                            <Button type='submit' mr={3} isLoading={loading} colorScheme={loading ? 'gray' : 'teal'}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddUserForm;
