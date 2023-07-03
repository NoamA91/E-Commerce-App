import {
  Box,
  useDisclosure,
  useBreakpointValue,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FiMenu } from "react-icons/fi"
import SidebarContent from './SidebarContent';
import Profile from './Profile';
import SidebarDrawer from './SidebarDrawer';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <>
      {
        isDrawerSidebar ? (
          <>
            <Flex h="40px">
              <Box
                h="40px"
                backgroundColor="gray.800"
                position='fixed'
                w='100%'
                zIndex={1}
              >
                <IconButton
                  icon={<FiMenu color='white' size={20} />}
                  onClick={onOpen}
                  background='none'
                  _hover={{ background: 'none' }}
                />
              </Box>
            </Flex>

            <SidebarDrawer isOpen={isOpen} onClose={onClose} />


          </>
        ) : (
          <Box
            display='block'
            as='aside'
          >
            <Flex
              w="270px"
              h="100vh"
              p={5}
              bg="gray.800"
              position="sticky"
              top={0}
              flexDir="column"
              justifyContent='space-between'
            >
              <SidebarContent />
              <Profile />
            </Flex>
          </Box >
        )}
    </ >
  );
};

export default Sidebar;
