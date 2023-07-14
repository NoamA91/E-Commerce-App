import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Image,
    Input,
    Avatar,
    HStack,
    VStack,
    Text,
    useBreakpointValue,
    useDisclosure,
    IconButton
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom"
import { PiBasketFill } from "react-icons/pi"
import { CgProfile } from "react-icons/cg"
import { FiMenu } from "react-icons/fi"
import SidebarDrawer from './SidebarDrawer'

const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        borderRadius={20}
                        w='400px'
                        h='100px'

                        bgImage='url(/Logo.png)'
                        backgroundSize='cover'
                        backgroundPosition='center'
                    >
                    </Box>
                </Flex>

                {/* Menu buttons */}
                <Flex
                    mt={2}
                    justifyContent='space-between'
                    mx={{ base: 4, md: 20 }}
                >
                    <ButtonGroup
                        variant='ghost'
                        gap={5}
                        display={{ base: "none", md: 'flex' }}
                    >
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                        >
                            <Link to='/'>Home</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                        >
                            <Link to='/shop'>Shop</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                        >
                            <Link to='/about'>About Us</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                        >
                            <Link to='/contact'>Contact</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                        >
                            <Link to='/blog'>Blog</Link>
                        </Button>
                    </ButtonGroup>


                    {/* Mobile menu  */}
                    {/* <Flex
                        display={{ base: 'flex', md: 'none' }}
                    >
                        <IconButton
                            icon={<HamburgerIcon color='ShopTeal.200' boxSize={7} />}
                            onClick={onOpen}
                            background='none'
                            _hover={{ background: 'none' }}
                        />
                    </Flex> */}
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
                        gap={{ md: 5 }}
                    >
                        <Button
                            size={{ base: 'sm', md: 'lg' }}
                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                            rightIcon={<CgProfile size={30} />}
                        >
                            Sign in
                        </Button>
                        <Button
                            size={{ base: 'sm', md: 'lg' }}

                            color='ShopTeal.200'
                            _hover={{
                                bg: 'ShopTeal.200',
                                color: 'blackAlpha.900',
                            }}
                            rightIcon={<PiBasketFill size={30} />}
                        >
                            Cart
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex >
        </>
    )
}

export default Nav