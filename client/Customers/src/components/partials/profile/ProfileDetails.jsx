import {
    Box,
    Text,
    Stack,
    Heading,
    Button,
    Input,
    Flex,
    ButtonGroup,
    VStack
} from "@chakra-ui/react";
import ErrorAlert from "../../ErrorAlert";
import { motion } from "framer-motion";

const ProfileDetails = ({ user, values, handleChange, handleSave, handleEdit, isEditing, error, cancelEdit }) => {

    return (
        <>
            <Flex
                minH={{ base: '100vh', md: '85vh' }}
                justifyContent='center'
            >
                <Box
                    w={{ base: "90%", md: "50%" }}
                    h='100%'
                    pb={5}
                >
                    <VStack
                        mb={10}
                    >
                        <Heading
                            as="h1"
                            size="xl"
                            mt={6}
                        >
                            My Profile
                        </Heading>
                        <Text fontSize="md">
                            {user?.email}
                        </Text>
                    </VStack>

                    <Stack spacing={isEditing ? 2 : 5}>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                Name:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        name="username"
                                        value={values.username || ""}
                                        onChange={handleChange}
                                        placeholder="Enter Username"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.username
                            )}
                        </Text>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                Phone:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        type='number'
                                        name="phone_number"
                                        value={values.phone_number || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.phone_number
                            )}
                        </Text>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                City:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        name="address.city"
                                        value={values.address?.city || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.address?.city
                            )}
                        </Text>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                Street:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        name="address.street"
                                        value={values.address?.street || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your street"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.address?.street
                            )}
                        </Text>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                Building:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        type='number'
                                        name="address.building"
                                        value={values.address?.building || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your building"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.address?.building
                            )}
                        </Text>
                        <Text fontSize="md">
                            <Text as="span" fontWeight="bold">
                                Apartment:
                            </Text>{" "}
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Input
                                        type='number'
                                        name="address.apartment"
                                        value={values.address?.apartment || ""}
                                        onChange={handleChange}
                                        placeholder="Enter your apartment"
                                        mb={3}
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                user?.address?.apartment
                            )}
                        </Text>
                    </Stack>
                    {isEditing ? (
                        <ButtonGroup>
                            <Button mt={4} colorScheme='teal' onClick={handleSave}>
                                Save
                            </Button>
                            <Button mt={4} colorScheme='gray' onClick={cancelEdit}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <Button mt={4} colorScheme='teal' onClick={handleEdit}>
                            Edit
                        </Button>
                    )}
                    {error && (<ErrorAlert error={error} clearError />)}
                </Box>
            </Flex>
        </>
    )
}

export default ProfileDetails