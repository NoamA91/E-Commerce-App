import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay
} from '@chakra-ui/modal'
import { Box, Divider } from '@chakra-ui/react'
import SidebarContent from '../partials/sidebar/SidebarContent'
import { PropTypes } from 'prop-types'

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
                        ml='55px'
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

SidebarDrawer.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}


export default SidebarDrawer