import {
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  Flex,
  IconButton,
  DrawerFooter,
  DrawerBody
} from '@chakra-ui/react';
import { FiMenu } from "react-icons/fi"
import SidebarContent from './SidebarContent';
import Profile from './Profile';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Box>
      {isDrawerSidebar ? (
        <>
          <Flex alignItems="center" justifyContent="space-between" backgroundColor="gray.800">
            <Box variant="ghost" onClick={onOpen} >
              <IconButton icon={<FiMenu color='white' />} w={6} h={6} background='none' />
            </Box>
          </Flex>

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent w="250px" bg="gray.800" >
              <DrawerCloseButton />

              <DrawerBody>
                <SidebarContent onClose={onClose} />
              </DrawerBody>

              <DrawerFooter>
                <Profile />
              </DrawerFooter>

            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Flex
          as="nav"
          w="270px"
          h="100vh"
          p={5}
          bg="gray.800"
          position="sticky"
          flexDir="column"
          justifyContent='space-between'
        >
          <SidebarContent />
          <Profile />
        </Flex>
      )}
    </Box>
  );
};

export default Sidebar;
