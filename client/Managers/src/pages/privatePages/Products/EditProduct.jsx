import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import EditProductForm from '../../../components/partials/products/EditProductForm'
import useFetchGet from '../../../hooks/useFetchGet';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { Box } from '@chakra-ui/react';

const EditProduct = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState();
    const [categories, setCategories] = useState();
    const edit_product_url = `${import.meta.env.VITE_SERVER_URL}/products/managers/get-by-id/${product_id}`;
    const categories_url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`;

    const [productData, productLoading, productError] = useFetchGet(edit_product_url);
    const [categoriesData, categoriesLoading, categoriesError] = useFetchGet(categories_url);

    useEffect(() => {
        if (productData) {
            setProduct(productData.product);
        }
        if (categoriesData) {
            setCategories(categoriesData.categories);
        }
    }, [productData, categoriesData]);

    const loading = productLoading || categoriesLoading;
    const error = productError || categoriesError;

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <Box h='100vh'><ErrorAlert error={error} /></Box>}
            {product && categories && <EditProductForm product={product} categories={categories} />}
        </>
    )
}

export default EditProduct
