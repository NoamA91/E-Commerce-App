import { IconButton } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay
} from '@chakra-ui/modal'
import React from 'react'
import Profile from './Profile'
import SidebarContent from './SidebarContent'

const DrawerSidebar = ({ isOpen, onClose }) => {

    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent w="250px" bg="gray.800" >
                    <DrawerCloseButton color="white" />

                    <DrawerBody mt={5}>
                        <SidebarContent onClose={onClose} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Profile />
                    </DrawerFooter>

                </DrawerContent >
            </Drawer>
        </>
    )
}

export default DrawerSidebar