import { Box, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import ProfileDetails from "../../components/partials/profile/ProfileDetails"
import axios from "axios";
import { useState } from "react";

const Profile = ({ user, setUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toast = useToast();
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        user_name: user.username,
        user_phone: user?.phone_number || "",
        address: {
            city: user.address?.city || "",
            street: user.address?.street || "",
            building: user.address?.building || "",
            apartment: user.address?.apartment || "",
        },
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/users/update/${user._id}`,
                values
            );

            setUser(data.user);
            setIsEditing(false);
            toast({
                title: "Profile updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            })
        } catch (error) {
            setError(error)
        }
    };

    const handleChange = (value) => {
        setValues({ ...values, [value.target.name]: value.target.value });
    };

    const handleNestedChange = (value) => {
        setValues({
            ...values,
            user_address: { ...values.user_address, [value.target.name]: value.target.value },
        });
    };

    return (
        <Box
            as={motion.div}
            bg='gray.100'
            w='100%'
            h='100%'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ProfileDetails
                user={user}
                values={values}
                handleChange={handleChange}
                handleNestedChange={handleNestedChange}
                handleSave={handleSave}
                handleEdit={handleEdit}
                isEditing={isEditing}
                error={error}
            />
        </Box>
    )
}


export default Profile