import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"

const EditUser = () => {
    const { user_id } = useParams();

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const getUserDataForEdit = async () => {

            const url = `http://localhost:3000/users/${user_id}`;
        }

    }, [])


    return (
        <></>
    )
}

export default EditUser