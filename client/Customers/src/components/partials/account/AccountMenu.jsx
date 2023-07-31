import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
    Text,
    Badge,
    Stack,
    HStack,
    chakra,
    Box,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    Spinner,
    VStack
} from '@chakra-ui/react'
import { FaUser } from "react-icons/fa"
import { AuthContext } from '../../../context/AuthContext'
import { useContext, useState } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const AccountMenu = () => {
    const { user, logout } = useContext(AuthContext)
    const CFaUser = chakra(FaUser)
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()

            toast({
                title: 'Logout Successful',
                description: 'You have successfully logged out',
                status: 'success',
                duration: 5000,
                isClosable: true
            })

        } catch (error) {
            toast({
                title: 'Logout Failed',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal isOpen={loading} isCentered>
                <ModalOverlay />
                <ModalContent
                    w='100px'
                    h='100px'
                >
                    <VStack
                        justifyContent='center'
                        alignContent='center'
                    >
                        <Text>Loading</Text>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="ShopTeal.300"
                            size="xl"
                        />
                    </VStack>
                </ModalContent>
            </Modal>


            <Menu placement='bottom-end'>
                <Box
                    as={motion.div}
                    whileTap={{ scale: 0.980 }}
                    whileFocus={{ scale: 0.980 }}
                >
                    <MenuButton
                        as={Button}
                        size={{ base: 'sm', md: 'md', lg: 'lg' }}
                        color='ShopTeal.200'
                        _hover={{
                            bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                            color: 'blackAlpha.900',
                        }}
                        _expanded={{
                            bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                            color: 'blackAlpha.900',
                        }}
                    >
                        <HStack>
                            <Text
                                fontSize={{ md: 'sm', lg: 'lg' }}
                                fontWeight='bold'
                            >
                                {user.username}
                            </Text>
                            <Stack position='relative'>
                                <CFaUser boxSize={{ base: 5, md: 6 }} />
                                <Badge
                                    position='absolute'
                                    borderRadius="full"
                                    bottom='-1'
                                    left={{ base: '3', md: '4' }}
                                    colorScheme='yellow'
                                    boxSize={{ base: '1.2em', md: '1em' }}
                                    border="3px solid"
                                    borderColor='blackAlpha.900'
                                />
                            </Stack>
                        </HStack>

                    </MenuButton>
                </Box>

                <MenuList
                    borderColor='blackAlpha.600'
                >
                    <Link to='/profile'>
                        <MenuItem
                            fontWeight='semibold'

                        >
                            Profile
                        </MenuItem>
                    </Link>

                    <Link to='/orders'>
                        <MenuItem
                            fontWeight='semibold'
                        >
                            My Orders
                        </MenuItem>
                    </Link>

                    <MenuDivider />

                    <MenuItem
                        color='red.500'
                        onClick={handleLogout}
                        icon={<IoLogOutOutline size={25} />}
                        fontWeight='semibold'
                    >
                        Logout
                    </MenuItem>

                </MenuList>
            </Menu >
        </>
    )
}

export default AccountMenu