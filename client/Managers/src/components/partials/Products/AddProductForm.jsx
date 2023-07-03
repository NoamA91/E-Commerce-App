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
    VStack,
    Box,
    ModalFooter,
    Button,
    useToast,
    Select,
    Image,
    Textarea,
    Divider,
    Center
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import useFetchGet from '../../../hooks/useFetchGet';

const AddProductForm = ({ isOpen, onClose, handleProductAdded }) => {
    const toast = useToast();
    const [values, setValues] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        image: "",
        count_in_stock: ""
    });

    // State for selected animal and for filtered categories
    const [selectedAnimal, setSelectedAnimal] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    // Fetch the category data
    const [response, loadingCategories, error] = useFetchGet(`${import.meta.env.VITE_SERVER_URL}/categories/managers/all`);
    const categories = response?.categories;

    useEffect(() => {
        if (error) {
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [error, toast]);

    // Update the filtered categories whenever the selected animal or the categories change
    useEffect(() => {
        if (selectedAnimal && categories) {
            const filtered = categories.filter(category => category.animal_type === selectedAnimal);
            setFilteredCategories(filtered);
        }
    }, [selectedAnimal, categories]);

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

            handleProductAdded(response.data.new_product);

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
                image: "",
                count_in_stock: ""
            });

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
                <ModalHeader>Add Product Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Box as='form' onSubmit={handleSubmit} >
                        <Box display="flex" flexDirection="row">
                            <VStack spacing={2} paddingRight={5} flexGrow={2}>

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

                                <FormControl id="animal" pb={4} isRequired>
                                    <FormLabel htmlFor="animal">Animal Type</FormLabel>
                                    <Select placeholder="Select animal" onChange={(e) => setSelectedAnimal(e.target.value)}>
                                        {
                                            !loadingCategories && categories && [...new Set(categories.map(category => category.animal_type))].map((animalType, index) => (
                                                <option key={index} value={animalType}>{animalType}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl id="category" pb={4} isRequired>
                                    <FormLabel htmlFor="category">Category Name</FormLabel>
                                    <Select placeholder="Select category" name="category" onChange={handleChange}>
                                        {
                                            !loadingCategories && filteredCategories && filteredCategories.map((category, index) => (
                                                <option key={index} value={category._id}>{category.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl id="description" pb={4} isRequired>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Textarea
                                        placeholder='Write Description'
                                        value={values.description}
                                        name="description"
                                        onChange={handleChange}
                                        type="text"
                                        resize='none'
                                        h='160px'
                                    />
                                </FormControl>

                            </VStack>

                            <VStack spacing={2} >

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

                                <FormControl id="count_in_stock" pb={4} isRequired>
                                    <FormLabel htmlFor="count_in_stock">Count In Stock</FormLabel>
                                    <Input
                                        placeholder='Enter Count In Stock'
                                        value={values.count_in_stock}
                                        name="count_in_stock"
                                        onChange={handleChange}
                                        type="number"
                                        min={0}
                                    />
                                </FormControl>

                                <FormControl id="image" isRequired>
                                    <FormLabel htmlFor="image">Image</FormLabel>
                                    <Input
                                        placeholder='Enter Image URL'
                                        value={values.image}
                                        name="image"
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </FormControl>

                                <Image
                                    mt={12}
                                    width={'300px'}
                                    height={'160px'}
                                    objectFit='cover'
                                    border={'2px solid gray'}
                                    src={values.image ? values.image
                                        : 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'}
                                />
                            </VStack>
                        </Box>
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
