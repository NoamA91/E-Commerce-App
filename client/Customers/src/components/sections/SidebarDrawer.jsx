import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay
} from '@chakra-ui/modal'
import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
// import SidebarContent from './SidebarContent'

const SidebarDrawer = ({ isOpen, onClose }) => {

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent w="250px" bg='blackAlpha.900' >
                    <DrawerCloseButton
                        color='ShopYellow'
                        size={3}
                        mt={3}
                    />

                    <Box
                        w='200px'
                        h='90px'
                        ml={35}
                        bgImage='url(/Logo.png)'
                        backgroundSize='contain'
                        backgroundRepeat='no-repeat'
                        backgroundPosition='center'
                    />

                    <Divider />

                    <DrawerBody mt={2}>
                        <Flex
                            flexDir='column'
                            mt={6}
                            gap={1}
                        >
                            <Link to='/'>
                                <Button
                                    w='100%'
                                    bg='ShopTeal.200'
                                    mt={2}
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    onClick={onClose}
                                >
                                    Home
                                </Button>
                            </Link>

                            <Link to='/shop'>
                                <Button
                                    w='100%'
                                    bg='ShopTeal.200'
                                    mt={1}
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    onClick={onClose}
                                >
                                    All Products
                                </Button>
                            </Link>

                            <Link to='/about'>
                                <Button
                                    w='100%'
                                    bg='ShopTeal.200'
                                    mt={1}
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    onClick={onClose}
                                >
                                    About Us
                                </Button>
                            </Link>

                            <Link to='/contact'>
                                <Button
                                    w='100%'
                                    bg='ShopTeal.200'
                                    mt={1}
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    onClick={onClose}
                                >
                                    Contact
                                </Button>
                            </Link>

                            <Link to='/blog'>
                                <Button
                                    w='100%'
                                    bg='ShopTeal.200'
                                    mt={1}
                                    _hover={{
                                        bg: 'ShopTeal.100',
                                    }}
                                    onClick={onClose}
                                >
                                    Blog
                                </Button>
                            </Link>
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        {/* <Profile /> */}
                    </DrawerFooter>

                </DrawerContent >
            </Drawer>
        </>
    )
}

export default SidebarDrawer