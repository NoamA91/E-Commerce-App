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
import SidebarContent from '../partials/sidebar/SidebarContent'

const SidebarDrawer = ({ isOpen, onClose }) => {

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent w="250px" bg='blackAlpha.900' >
                    <DrawerCloseButton
                        color='ShopYellow'
                        size={3}
                        mt={3}
                    />

                    {/* Logo */}
                    <Box
                        w='200px'
                        h='90px'
                        bgImage='url(/Logo.png)'
                        backgroundSize='contain'
                        backgroundRepeat='no-repeat'
                        backgroundPosition='center'
                    />

                    <Divider />

                    <DrawerBody mt={2}>
                        <SidebarContent onClose={onClose} />
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