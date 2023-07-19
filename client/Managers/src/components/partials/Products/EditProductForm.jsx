import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Box,
    Button,
    useToast,
    Select,
    Image,
    Container,
    Heading,
    HStack,
    Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorAlert from '../../ErrorAlert';

const EditProductForm = ({ product, categories }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const {
        title,
        category,
        count_in_stock,
        description,
        image,
        price
    } = product;

    const [values, setValues] = useState({
        title,
        category: category._id,
        count_in_stock,
        description,
        image,
        price
    });

    // Initial selected animal is the animal type of the product's category
    const [selectedAnimal, setSelectedAnimal] = useState(category.animal_type);

    // State for filtered categories
    const [filteredCategories, setFilteredCategories] = useState([]);

    // Update the filtered categories whenever the selected animal or the categories change
    useEffect(() => {
        if (selectedAnimal && categories) {
            const filtered = categories.filter(category => category.animal_type === selectedAnimal);
            setFilteredCategories(filtered);
        }
    }, [selectedAnimal, categories]);

    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [errorNewImage, setErrorNewImage] = useState(null);
    const [loadingNewImage, setLoadingNewImage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const selectedCategory = categories.find(cat => cat._id === value);
            setSelectedAnimal(selectedCategory.animal_type);
        }
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleUploadNewImage = async () => {
        try {
            setLoadingNewImage(true);
            const formData = new FormData();
            formData.append("image", newImage);

            const response = await axios.post(
                "http://localhost:3000/products/managers/add-new-image",
                formData
            );

            setNewImage(null);
            setImagePreview(response.data.image);
            setValues((prevValues) => ({
                ...prevValues,
                image: response.data.image,
            }));

            setLoadingNewImage(false);
            setErrorNewImage(null);

            toast({
                title: "Image upload success",
                description: "The image has been uploaded successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            setErrorNewImage(error.response.data.error);

        } finally {
            setLoadingNewImage(false);
        }
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/products/managers/update-product/${product._id}`,
                values,
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast({
                title: 'Edit Product',
                description: "Product details updated successfully",
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
            <Heading as='h3' textAlign='center' my={10}>Edit Product</Heading>

            <Container maxW='container.md' h='100vh'>

                <Box as='form' bg='white' p={8} onSubmit={handleSubmit} borderRadius={8} boxShadow='md' >
                    <Box display="flex" flexDirection="row">
                        <VStack spacing={4} paddingRight={5} flexGrow={2}>

                            <FormControl id='title' pb={4} isRequired>
                                <FormLabel htmlFor='title'>Product Name</FormLabel>
                                <Input
                                    placeholder='Enter Product Name'
                                    value={values.title}
                                    name='title'
                                    onChange={handleChange}
                                    type='text'
                                />
                            </FormControl>

                            <FormControl id="animal" pb={4}>
                                <FormLabel htmlFor="animal">Animal Type</FormLabel>
                                <Select placeholder="Change Animal" value={selectedAnimal} onChange={(e) => setSelectedAnimal(e.target.value)}>
                                    {
                                        categories && [...new Set(categories.map(category => category.animal_type))].map((animalType, index) => (
                                            <option key={index} value={animalType}>{animalType}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>


                            <FormControl id="category" pb={4}>
                                <FormLabel htmlFor="category">Category Name</FormLabel>
                                <Select placeholder="Change Category" name="category" value={values.category} onChange={handleChange}>
                                    {
                                        filteredCategories && filteredCategories.map((category, index) => (
                                            <option key={index} value={category._id}>{category.name}</option>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl id="description" pb={4} isRequired>
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <Textarea
                                    placeholder='Write a Description'
                                    value={values.description}
                                    name="description"
                                    onChange={handleChange}
                                    type="text"
                                    resize='none'
                                    h='160px'
                                />
                            </FormControl>

                        </VStack>

                        <VStack spacing={4}>

                            <FormControl id="price" pb={4} isRequired>
                                <FormLabel htmlFor="price">Price</FormLabel>
                                <Input
                                    placeholder='Enter Price'
                                    value={values.price}
                                    name="price"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                />
                            </FormControl>

                            <FormControl id="count_in_stock" pb={4} isRequired>
                                <FormLabel htmlFor="count_in_stock">Count In Stock</FormLabel>
                                <Input
                                    placeholder='Enter Stock Number'
                                    value={values.count_in_stock}
                                    name="count_in_stock"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                />
                            </FormControl>

                            <VStack>
                                <FormControl id="image" pb={2}>
                                    <FormLabel htmlFor="image">Image</FormLabel>
                                    <Input
                                        defaultValue={newImage}
                                        variant='flushed'
                                        name="image"
                                        onChange={handleFileChange}
                                        type="file"
                                        accept="image/*"
                                    />
                                </FormControl>
                                <Button
                                    onClick={handleUploadNewImage}
                                    isLoading={loadingNewImage}
                                    size='sm'
                                >
                                    Upload New Image
                                </Button>
                            </VStack>

                            <Image
                                width={'300px'}
                                maxH={'160px'}
                                objectFit='cover'
                                border={'2px solid gray'}
                                src={imagePreview ? imagePreview : values.image ? values.image : '/placeholder-image.jpg'}
                            />
                        </VStack>
                    </Box>
                    {errorNewImage && <ErrorAlert error={errorNewImage} />}
                    <HStack pt={9}>
                        <Button type='submit' mr={3} isLoading={loading} colorScheme={loading ? 'gray' : 'teal'}>
                            Update
                        </Button>
                        <Button onClick={() => navigate("../")}>Back</Button>
                    </HStack>
                </Box>
            </Container>
        </>
    )
}
export default EditProductForm