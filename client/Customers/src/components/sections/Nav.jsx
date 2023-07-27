import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import SidebarDrawer from './SidebarDrawer'
import { motion } from 'framer-motion';
import ShoppingCart from "./ShoppingCart"
import { CurrentPageContext } from "../../context/CurrentPageContext"
import { useContext } from "react"


const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setCurrentPage } = useContext(CurrentPageContext)

    return (

        <>
            <Flex
                as='nav'
                w='100%'
                bg='blackAlpha.900'
                flexDir='column'
                pb={3}
            >

                {/* Logo */}
                <Flex
                    pt={2}
                    justifyContent='center'
                >
                    <Box
                        as={Link}
                        to='/'
                        display={{ base: 'none', md: 'block' }}
                        borderRadius={20}
                        w='400px'
                        h='100px'
                        bgImage='url(/Logo.png)'
                        backgroundSize='cover'
                        backgroundPosition='center'
                    />
                </Flex>

                {/* Menu buttons */}
                <Flex
                    mt={2}
                    justifyContent={{ base: 'space-between', md: 'center', lg: 'space-between' }}
                    mx={{ base: 4, md: 0, lg: 20 }}
                >
                    <ButtonGroup
                        variant='ghost'
                        gap={{ md: 0, lg: 5 }}
                        display={{ base: "none", md: 'flex' }}
                    >
                        <Link to='/'>
                            <motion.div
                                whileHover={{ scale: 1.050 }}
                                whileTap={{ scale: 0.980 }}
                            >
                                <Button
                                    size={{ md: 'md', lg: 'lg' }}
                                    color='ShopTeal.200'
                                    _hover={{
                                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                                        color: 'blackAlpha.900',
                                    }}
                                >
                                    Home
                                </Button>
                            </motion.div>
                        </Link>

                        <Link to='/products'>
                            <motion.div
                                whileHover={{ scale: 1.050 }}
                                whileTap={{ scale: 0.980 }}
                            >
                                <Button
                                    size={{ md: 'md', lg: 'lg' }}
                                    color='ShopTeal.200'
                                    _hover={{
                                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                                        color: 'blackAlpha.900',
                                    }}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    Products
                                </Button>
                            </motion.div>
                        </Link>

                        <Link to='/about'>
                            <motion.div
                                whileHover={{ scale: 1.050 }}
                                whileTap={{ scale: 0.980 }}
                            >
                                <Button
                                    size={{ md: 'md', lg: 'lg' }}
                                    color='ShopTeal.200'
                                    _hover={{
                                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                                        color: 'blackAlpha.900',
                                    }}
                                >
                                    About Us
                                </Button>
                            </motion.div>
                        </Link>

                        <Link to='/contact'>
                            <motion.div
                                whileHover={{ scale: 1.050 }}
                                whileTap={{ scale: 0.980 }}
                            >
                                <Button
                                    size={{ md: 'md', lg: 'lg' }}
                                    color='ShopTeal.200'
                                    _hover={{
                                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                                        color: 'blackAlpha.900',
                                    }}
                                >
                                    Contact
                                </Button>
                            </motion.div>
                        </Link>
                    </ButtonGroup>


                    {/* Mobile menu  */}
                    <Button
                        variant={'unstyled'}
                        onClick={onOpen}
                    >
                        <HamburgerIcon
                            display={{ base: 'flex', md: 'none' }}
                            color='ShopTeal.200'
                            boxSize={7}
                        />
                    </Button>

                    <SidebarDrawer isOpen={isOpen} onClose={onClose} />


                    {/* Profile and cart */}
                    <ButtonGroup
                        variant='ghost'
                        gap={{ lg: 2 }}
                    >
                        <Link to='/login'>
                            <motion.div
                                whileHover={{ scale: 1.050 }}
                                whileTap={{ scale: 0.980 }}
                            >
                                <Button
                                    size={{ base: 'sm', md: 'md', lg: 'lg' }}
                                    color='ShopTeal.200'
                                    _hover={{
                                        bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                                        color: 'blackAlpha.900',
                                    }}
                                    rightIcon={<CgProfile size={30} />}
                                >
                                    <Text
                                        display={{ base: 'none', md: 'flex' }}
                                    >
                                        Login
                                    </Text>
                                </Button>
                            </motion.div>
                        </Link>
                        <ShoppingCart />
                    </ButtonGroup>
                </Flex>
            </Flex >
        </>
    )
}

export default Nav