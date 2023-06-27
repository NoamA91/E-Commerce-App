import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import EditUserForm from '../../../components/partials/users/EditUserForm'
import useFetchGet from '../../../hooks/useFetchGet';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';

const EditUser = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState();
    const url = `http://localhost:3000/users/managers/getUserByIdForManager/${user_id}`;
    const [data, loading, error] = useFetchGet(url);

    useEffect(() => {

        if (data) {
            setUser(data.user);
        }
    }, [data]);

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <ErrorAlert error={error} />}
            {user && <EditUserForm user={user} />}
        </>
    )
}

export default EditUser