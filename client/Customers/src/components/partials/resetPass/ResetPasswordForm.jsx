import {
    Box,
    Button,
    FormControl,
    Input,
    VStack,
    Heading,
    InputGroup,
    InputLeftElement,
    Flex,
    Text,
    chakra
} from '@chakra-ui/react'
import SVG from '../../SVG';
import ErrorAlert from '../../ErrorAlert';
import { motion } from 'framer-motion';
import { IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ResetPasswordForm = ({ handleSubmit, handleChange, values, loading, error }) => {
    const CIoMail = chakra(IoMail);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(values);
    };

    return (
        <>
            <Flex
                flexDir={{ base: 'column', md: 'row' }}
                justifyContent={{ md: 'center' }}
                minH={{ base: '78vh', md: '50vh' }}
            >
                <VStack
                    as='form'
                    bg='whiteAlpha.700'
                    spacing={5}
                    w={{ base: '100%', md: '500px' }}
                    mt={{ base: 5, md: 120 }}
                    boxShadow={{ md: 'md' }}
                    borderRadius={10}
                    p={8}
                    onSubmit={onSubmit}
                    pos='absolute'
                >
                    <Heading
                        as='h2'
                        size='xl'
                    >
                        Reset Password
                    </Heading>

                    <Text
                        fontWeight='semibold'
                        textAlign='center'
                    >
                        Please enter the email address associated with your account
                    </Text>

                    <FormControl>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CIoMail
                                    color='ShopTeal.300'
                                    fontSize='1.5em'
                                />
                            </InputLeftElement>
                            <Input
                                type='email'
                                placeholder='Email Address'
                                focusBorderColor='teal'
                                name='email'
                                onChange={handleChange}
                                isRequired
                            />
                        </InputGroup>
                    </FormControl>

                    <Button
                        colorScheme='teal'
                        size={{ base: 'md', md: 'lg' }}
                        w='100%'
                        isLoading={loading}
                        type='submit'
                    >
                        Send
                    </Button>
                    {error && !loading &&
                        <Box
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            w='100%'
                        >
                            <ErrorAlert error={error} />
                        </Box>
                    }
                </VStack>
            </Flex>

            <Box
                bg='gray.100'
                w='100%'
            >
                <SVG />
            </Box>
        </>
    )
}

export default ResetPasswordForm