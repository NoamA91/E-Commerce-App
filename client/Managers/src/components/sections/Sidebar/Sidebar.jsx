import {
  Box,
  Text, 
  useDisclosure, 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  Button, 
  useBreakpointValue, 
  Flex, 
  IconButton, 
  Divider, 
  Avatar, 
  Heading, 
  DrawerFooter, 
  DrawerBody 
} from '@chakra-ui/react';
import { FiMenu } from "react-icons/fi"
import SidebarContent from './SidebarContent';


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
            <DrawerContent w="250px" bg="gray.800" color="white">
              <DrawerCloseButton />

              <DrawerBody>
                <SidebarContent onClose={onClose}/>
              </DrawerBody>

              <DrawerFooter>
                <Flex
                  p='5%'
                  flexDir='column'
                  w='100%'
                  mb={4}
                >
                  <Divider />
                  <Flex mt={4} alignItems='center'>
                    <Avatar size='sm' />
                    <Flex flexDir='column' ml={4} >
                      <Heading as='h3' size='sm' color='white'>
                        User Name
                      </Heading>
                      <Text color='grey'>Role</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </DrawerFooter>

            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Flex
          as="nav"
          w="250px"
          h="100vh"
          p={5}
          bg="gray.800"
          position="sticky"
          flexDir="column"
          justifyContent='space-between'
        >
        <SidebarContent/>

          <Flex
            p='5%'
            flexDir='column'
            w='100%'
            mb={4}
          >
            <Divider />
            <Flex mt={4} alignItems='center'>
              <Avatar size='sm' />
              <Flex flexDir='column' ml={4} >
                <Heading as='h3' size='sm' color='white'>
                  User Name
                </Heading>
                <Text color='grey'>Role</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Sidebar;
