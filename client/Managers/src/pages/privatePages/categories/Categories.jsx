import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useFetchGet from '../../../hooks/useFetchGet'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Alert, AlertIcon, useToast } from '@chakra-ui/react'
import axios from "axios";
import ErrorAlert from '../../../components/ErrorAlert'

import CategoriesTable from '../../../components/partials/categories/CategoriesTable'

const Categories = () => {
    const toast = useToast();
    const [categories, setCategories] = useState([])
    const categories_url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`;
    const [data, loading, error] = useFetchGet(categories_url);

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/categories/managers/delete-category/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.error);
            }

            toast({
                title: 'Delete Category',
                description: "The category has been deleted successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            const updatedCategories = categories.filter((category) => category._id !== id);
            setCategories(updatedCategories);

        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (data) {
            setCategories(data.categories);
        }
    }, [data]);

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert error={error} />}
            {categories && (
                <CategoriesTable
                    categories={categories}
                    handleCategoryAdded={handleCategoryAdded}
                    deleteCategory={deleteCategory}
                />
            )}
        </>
    )
}

export default Categories