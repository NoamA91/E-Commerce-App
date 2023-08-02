import { Box, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ProfileDetails from '../../components/partials/profile/ProfileDetails'
import axios from 'axios';
import { useState } from 'react';
import ErrorAlert from '../../components/ErrorAlert';

const Profile = ({ user, setUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        username: user?.username,
        phone_number: user?.phone_number || '',
        address: user?.address ? {
            city: user.address?.city || '',
            street: user.address?.street || '',
            building: user.address?.building || '',
            apartment: user.address?.apartment || '',
        } : {}
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {

            const { data } = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/users/updateByid/${user._id}`,
                values
            );

            setUser(data.user);
            setIsEditing(false);
            toast({
                title: 'Profile Updated Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            setError(error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            // Update nested address values
            const addressField = name.split('.')[1];
            setValues((prevValues) => ({
                ...prevValues,
                address: {
                    ...prevValues.address,
                    [addressField]: value,
                },
            }));
        } else {
            // Update other values
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    return (
        <Box
            bg='gray.100'
            w='100%'
            h='100%'
        >
            <ProfileDetails
                user={user}
                values={values}
                handleChange={handleChange}
                handleSave={handleSave}
                handleEdit={handleEdit}
                cancelEdit={cancelEdit}
                isEditing={isEditing}
                error={error}
            />
        </Box>
    )
}


export default Profile