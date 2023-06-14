// import { Flex, Divider, Avatar, Heading, Text, IconButton } from "@chakra-ui/react";
// import { useState } from "react";
// import { FiMenu, FiHome, FiUsers, FiBox, FiBook } from "react-icons/fi";
// import NavItem from "./NavItem";

// const Sidebar = () => {
//   const [navSize, setNavSize] = useState("large");
//   const [activeItem, setActiveItem] = useState("Dashboard");

//   const handleItemClick = (title) => {
//     setActiveItem(title);
//   };

//   return (
//     <Flex
//       pos='sticky'
//       left='0'
//       h='100vh'
//       boxShadow='0 0 12px 0 rgba(0,0,0,0.10)'
//       // w={navSize === "small" ? "75px" : "300px"}
//       w={{ base: "75px", md: "300px" }}
//       flexDir='column'
//       justifyContent='space-between'
//     >
//       <Flex
//         p='5%'
//         flexDir='column'
//         alignItems={{ base: "center", md: "flex-start" }}
//         // alignItems={navSize === "small" ? "center" : "flex-start"}
//         as='nav'
//         w='100%'
//       >
//         <IconButton
//           background='none'
//           mt={5}
//           _hover={{ background: "none" }}
//           icon={<FiMenu />}
//           onClick={() => {
//             navSize === "small" ? setNavSize("large") : setNavSize("small");
//           }}
//         />
//         <NavItem
//           navSize={navSize}
//           icon={FiHome}
//           title='Dashboard'
//           active={activeItem === "Dashboard"}
//           handleClick={handleItemClick}
//           to='/dashboard'
//         />
//         <NavItem
//           navSize={navSize}
//           icon={FiUsers}
//           title='Users'
//           active={activeItem === "Users"}
//           handleClick={handleItemClick}
//         />
//         <NavItem
//           navSize={navSize}
//           icon={FiBox}
//           title='Products'
//           active={activeItem === "Products"}
//           handleClick={handleItemClick}
//         />
//         <NavItem
//           navSize={navSize}
//           icon={FiBook}
//           title='Orders'
//           active={activeItem === "Orders"}
//           handleClick={handleItemClick}
//         />
//       </Flex>
// <Flex
//   p='5%'
//   flexDir='column'
//   w='100%'
//   alignItems={navSize === "small" ? "center" : "flex-start"}
//   mb={4}
// >
//   <Divider display={navSize === "small" ? "none" : "flex"} />
//   <Flex mt={4} alignItems='center'>
//     <Avatar size='sm' />
//     <Flex flexDir='column' ml={4} display={navSize === "small" ? "none" : "flex"}>
//       <Heading as='h3' size='sm'>
//         User Name
//       </Heading>
//       <Text color='grey'>Role</Text>
//     </Flex>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// export default Sidebar;

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
