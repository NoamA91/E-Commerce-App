import {
    Box,
    Text,
    Stack,
    Heading,
    Button,
    Input,
    Flex,
    ButtonGroup,
    VStack,
    Divider
} from '@chakra-ui/react';
import ErrorAlert from '../../ErrorAlert';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EditIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

const ProfileDetails = ({ user, values, handleChange, handleSave, handleEdit, isEditing, error, cancelEdit }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <>
            <Flex
                minH={{ base: '90vh', md: '85vh' }}
                justifyContent='center'
                bg='gray.100'
            >
                <Box
                    as={motion.div}
                    initial={{ opacity: 0, delayChildren: 0.3 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    minW={{ base: '90%', md: '35%' }}
                    h='100%'
                    pb={5}
                >
                    <VStack
                        mb={6}
                    >
                        <Heading
                            as='h1'
                            size='xl'
                            mt={6}
                        >
                            My Profile
                        </Heading>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight='semibold'
                        >
                            {user?.email}
                        </Text>
                    </VStack>

                    <Stack
                        spacing={isEditing ? 2 : 5}
                        border='1px black solid'
                        borderRadius={10}
                        p={5}
                    >
                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}

                        >
                            <Text as='span' fontWeight='bold'>
                                Username:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        name='username'
                                        value={values.username || ''}
                                        onChange={handleChange}
                                        placeholder='Enter Username'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.username}</Text>
                            )}
                        </Flex>

                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span' fontWeight='bold'>
                                Phone:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        type='text'
                                        name='phone_number'
                                        value={values.phone_number || ''}
                                        onChange={handleChange}
                                        placeholder='Enter your phone number'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.phone_number}</Text>
                            )}
                        </Flex>

                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span' fontWeight='bold'>
                                City:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        name='address.city'
                                        value={values.address?.city || ''}
                                        onChange={handleChange}
                                        placeholder='Enter your city'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.address?.city}</Text>
                            )}
                        </Flex>

                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span' fontWeight='bold'>
                                Street:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        name='address.street'
                                        value={values.address?.street || ''}
                                        onChange={handleChange}
                                        placeholder='Enter your street'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.address?.street}</Text>
                            )}
                        </Flex>

                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span' fontWeight='bold'>
                                Building:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        type='number'
                                        name='address.building'
                                        value={values.address?.building || ''}
                                        onChange={handleChange}
                                        placeholder='Enter your building'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                        min={1}
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.address?.building}</Text>
                            )}
                        </Flex>

                        <Flex
                            fontSize={{ base: 'md', md: 'lg' }}
                            flexDir='column'
                            p={2}
                        >
                            <Text as='span' fontWeight='bold'>
                                Apartment:
                            </Text>
                            {isEditing ? (
                                <Box
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Input
                                        type='number'
                                        name='address.apartment'
                                        value={values.address?.apartment || ''}
                                        onChange={handleChange}
                                        placeholder='Enter your apartment'
                                        variant='flushed'
                                        focusBorderColor='teal'
                                        size={{ base: 'md', md: 'lg' }}
                                        bg='gray.200'
                                        min={1}
                                    />
                                </Box>
                            ) : (
                                <Text>{user?.address?.apartment}</Text>
                            )}
                        </Flex>
                        <Divider />
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
                            <ButtonGroup
                                size={{ md: 'md', base: 'sm' }}
                            >
                                <Button
                                    colorScheme='teal'
                                    onClick={handleEdit}
                                    m={0}
                                    leftIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>

                                <Link
                                    to='/orders'
                                >
                                    <Button
                                        colorScheme='blue'
                                        w='100%'
                                    >
                                        My Orders
                                    </Button>
                                </Link>

                                <Link
                                    to='/change-password'
                                >
                                    <Button
                                        colorScheme='red'
                                        w='100%'
                                    >
                                        Change Password
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        )}
                    </Stack>
                    {error && isEditing && (<ErrorAlert error={error} clearError />)}
                </Box>
            </Flex >
        </>
    )
}

export default ProfileDetails