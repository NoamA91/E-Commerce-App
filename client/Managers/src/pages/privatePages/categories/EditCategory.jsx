import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import EditCategoryForm from '../../../components/partials/categories/EditCategoryForm'
import useFetchGet from '../../../hooks/useFetchGet';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { Box } from '@chakra-ui/react';



const EditCategory = () => {
    const { category_id } = useParams();
    const [category, setCategory] = useState(null);
    const edit_category_url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/get-by-id/${category_id}`;
    const [data, error, loading] = useFetchGet(edit_category_url);

    useEffect(() => {
        if (data) {
            setCategory(data.category);
        }
    }, [data]);

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <Box h='100vh'><ErrorAlert error={error} /></Box>}
            {category && <EditCategoryForm category={category} />}
        </>
    )
}

export default EditCategory