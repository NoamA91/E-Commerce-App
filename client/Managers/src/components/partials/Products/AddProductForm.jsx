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
const AddProductForm = ({ isOpen, onClose, handleUserAdded }) => {
    const toast = useToast();
    const [values, setValues] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        image: ""
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
                `${import.meta.env.VITE_SERVER_URL}/products/managers/add-product`,
                values,
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            handleProudctAdded(response.data.new_product);

            toast({
                title: 'Add Product',
                description: "Product added successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setValues({
                title: "",
                category: "",
                description: "",
                price: "",
                image: ""
            });

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
                <ModalHeader>Add Product Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Box as='form' onSubmit={handleSubmit} >
                        <Flex>
                            <FormControl id='title' pb={4} isRequired>
                                <FormLabel htmlFor='title'>Product Name</FormLabel>
                                <Input
                                    placeholder='Enter Animal Type'
                                    value={values.title}
                                    name='title'
                                    onChange={handleChange}
                                    type='text'
                                />
                            </FormControl>

                            <FormControl id="category" pb={4} isRequired>
                                <FormLabel htmlFor="category">Category Name</FormLabel>
                                <Input
                                    placeholder='Enter Category Name'
                                    value={values.category}
                                    name="category"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </FormControl>

                            <FormControl id="description" pb={4} isRequired>
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Input
                                    placeholder='Write Description'
                                    value={values.description}
                                    name="description"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </FormControl>

                            <FormControl id="price" pb={4} isRequired>
                                <FormLabel htmlFor="price">Price</FormLabel>
                                <Input
                                    placeholder='Enter Price'
                                    value={values.price}
                                    name="price"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                />
                            </FormControl>

                            <FormControl id="image" pb={4} isRequired>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <Input
                                    placeholder='Enter Image URL'
                                    value={values.image}
                                    name="image"
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

export default AddProductForm