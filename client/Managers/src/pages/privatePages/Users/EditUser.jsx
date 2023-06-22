import { Alert, AlertIcon, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import EditUserForm from '../../../components/partials/users/EditUserForm'

const EditUser = () => {
    const { user_id } = useParams();

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const getUserDataForEdit = async () => {

            const url = `http://localhost:3000/users/managers/getUserByIdForManager/${user_id}`;

            try {

                const response = await axios.get(url);

                setUser(response.data.user);

            } catch (error) {
                setError(error.response.data.error);
            } finally {
                setLoading(false);
            }
        }
        getUserDataForEdit();

    }, [])


    return (
        <>
            {loading && <Flex
                w='100%'
                h='100vh'
                justifyContent='center'
                alignItems='center'
            >
                <Spinner size='xl' />
            </Flex>}

            {error && <Alert status='error'>
                <AlertIcon />
                {error.message}
            </Alert>}

            {user && <EditUserForm user={user} />}
        </>
    )
}

export default EditUser