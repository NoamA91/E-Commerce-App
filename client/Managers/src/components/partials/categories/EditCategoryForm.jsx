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


const EditCategoryForm = ({ category }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {
        name,
        animal_type
    } = category;

    const [values, setValues] = useState({
        name,
        animal_type
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/categories/managers/update-category/${category._id}`,
                values,
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast({
                title: 'Edit Category',
                description: "Category details updated successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("../");

        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.message ? error.response.data.message : 'Error',
                description: error.response.data.error ? error.response.data.error : 'Unable to update category',
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
            <Heading as='h3' textAlign='center' my={10}>Edit Category</Heading>
            <Box h='100vh' >
                <Container maxW='xl'>
                    <Box as='form' bg='white' p={8} onSubmit={handleSubmit} borderRadius={8} boxShadow='md' >
                        <Flex gap={3}>
                            <FormControl id="animal_type" pb={4} isRequired>
                                <FormLabel htmlFor="animal_type">Animal Type</FormLabel>
                                <Input
                                    value={values.animal_type}
                                    name="animal_type"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </FormControl>

                            <FormControl id="name" pb={4} isRequired>
                                <FormLabel htmlFor="name">Category Name</FormLabel>
                                <Input
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </FormControl>
                        </Flex>

                        <Flex justifyContent='flex-end' mt={4}>
                            <Button type='submit' mr={3} isLoading={loading} colorScheme={loading ? 'gray' : 'teal'}>
                                Update
                            </Button>
                            <Button onClick={() => navigate("../")}>Back</Button>
                        </Flex>
                    </Box>
                </Container>
            </Box >
        </>
    )
}

export default EditCategoryForm