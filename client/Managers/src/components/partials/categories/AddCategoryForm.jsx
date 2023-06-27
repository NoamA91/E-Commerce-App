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

const AddCategoryForm = ({ isOpen, onClose, handleCategoryAdded }) => {
    const toast = useToast()
    const [values, setValues] = useState({
        animal_type: "",
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues, [name]: value,
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/categories/managers/add-category`,
                values,
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            handleCategoryAdded(response.data.new_category);

            toast({
                title: 'Add Category',
                description: "Category added successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setValues({
                animal_type: "",
                name: "",
            })

            onClose();
        } catch (error) {
            console.log(error);
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
                <ModalHeader>Add Category Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Box as='form' onSubmit={handleSubmit} >
                        <Flex>
                            <FormControl id='animal_type' pb={4} isRequired>
                                <FormLabel htmlFor='animal_type'>Animal Type</FormLabel>
                                <Input
                                    placeholder='Enter Animal Type'
                                    value={values.animal_type}
                                    name='animal_type'
                                    onChange={handleChange}
                                    type='text'
                                />
                            </FormControl>

                            <FormControl id="name" pb={4} isRequired>
                                <FormLabel htmlFor="name">Category Name</FormLabel>
                                <Input
                                    placeholder='Enter Category Name'
                                    value={values.email}
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </FormControl>
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
    )
}

export default AddCategoryForm