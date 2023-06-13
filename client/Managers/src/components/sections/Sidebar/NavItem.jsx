// // import { Flex, Text, Icon, Menu, MenuButton, Tooltip } from "@chakra-ui/react";
// // import { Link } from "react-router-dom";

// // const NavItem = ({ navSize, title, icon, active, handleClick, to }) => {
// //   return (
// //     <Flex
// //       mt={30}
// //       flexDir='column'
// //       w='100%'
// //       alignItems={navSize === "small" ? "center" : "flex-start"}
// //     >
// //       <Menu>
// //         {navSize === "small" ? (
// //           <Tooltip borderRadius={5} hasArrow label={title} placement='right'>
// //             <Link to={to} style={{ textDecoration: "none" }} onClick={() => handleClick(title)}>
// //               <MenuButton
// //                 backgroundColor={active ? "#AEC8CA" : "transparent"}
// //                 borderRadius={8}
// //                 _hover={{ backgroundColor: "#AEC8CA" }}
// //                 w={navSize === "large" && "100%"}
// //               >
// //                 <Flex padding={3}>
// //                   <Icon as={icon} fontSize='xl' color={active ? "A82AAAD" : "grey.500"} />
// //                   <Text
// //                     ml={5}
// //                     display={navSize === "small" ? "none" : "flex"}
// //                     fontWeight={active ? "bold" : "normal"}
// //                   >
// //                     {title}
// //                   </Text>
// //                 </Flex>
// //               </MenuButton>
// //             </Link>
// //           </Tooltip>
// //         ) : (
// //           <Link to={to} style={{ textDecoration: "none" }} onClick={() => handleClick(title)}>
// //             <MenuButton
// //               backgroundColor={active ? "#AEC8CA" : "transparent"}
// //               borderRadius={8}
// //               _hover={{ backgroundColor: "#AEC8CA" }}
// //               maxW={navSize === "large" && "210px"}
// //             >
// //               <Flex padding={3} w='100%' alignItems='center'>
// //                 <Icon as={icon} fontSize='xl' color={active ? "A82AAAD" : "grey.500"} />
// //                 <Text
// //                   ml={5}
// //                   display={navSize === "small" ? "none" : "flex"}
// //                   fontWeight={active ? "bold" : "normal"}
// //                 >
// //                   {title}
// //                 </Text>
// //               </Flex>
// //             </MenuButton>
// //           </Link>
// //         )}
// //       </Menu>
// //     </Flex>
// //   );
// // };

// // export default NavItem;
// import { Flex, Text, Icon, Menu, MenuButton, Tooltip } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// const NavItem = ({ title, icon, active, handleClick, to }) => {
//   return (
//     <Flex mt={30} flexDir="column" w="100%" alignItems="flex-start">
//       <Menu>
//         <Tooltip hasArrow borderRadius={5} label={title} placement="right">
//           <Link to={to} style={{ textDecoration: "none" }} onClick={() => handleClick(title)}>
//             <MenuButton
//               backgroundColor={active ? "#AEC8CA" : "transparent"}
//               borderRadius={8}
//               _hover={{ backgroundColor: "#AEC8CA" }}
//               w={{ base: "100%", lg: "210px" }}
//             >
//               <Flex padding={3} w="100%" alignItems="center">
//                 <Icon as={icon} fontSize="xl" color={active ? "A82AAAD" : "grey.500"} />
//                 <Text
//                   ml={5}
//                   display={{ base: "none", lg: "flex" }}
//                   fontWeight={active ? "bold" : "normal"}
//                 >
//                   {title}
//                 </Text>
//               </Flex>
//             </MenuButton>
//           </Link>
//         </Tooltip>
//       </Menu>
//     </Flex >
//   );
// };

// export default NavItem;
