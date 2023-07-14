import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay
} from '@chakra-ui/modal'
// import SidebarContent from './SidebarContent'

const SidebarDrawer = ({ isOpen, onClose }) => {

    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent w="250px" bg="gray.800" >
                    <DrawerCloseButton color="white" />

                    <DrawerBody mt={5}>
                        {/* <SidebarContent onClose={onClose} /> */}
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