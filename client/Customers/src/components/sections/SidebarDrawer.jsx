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
                        mt={2}
                    />

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