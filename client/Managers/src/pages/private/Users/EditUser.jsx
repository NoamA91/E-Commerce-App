import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import EditUserForm from '../../../components/partials/users/EditUserForm'
import useFetchGet from '../../../hooks/useFetchGet';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import { Box } from '@chakra-ui/react';

const EditUser = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState();
    const edit_user_url = `${import.meta.env.VITE_SERVER_URL}/users/managers/getUserByIdForManager/${user_id}`;
    const [data, loading, error] = useFetchGet(edit_user_url);

    useEffect(() => {
        if (data) {
            setUser(data.user);
        }
    }, [data]);

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <Box h='100vh'><ErrorAlert error={error} /></Box>}
            {user && <EditUserForm user={user} />}
        </>
    )
}

export default EditUser