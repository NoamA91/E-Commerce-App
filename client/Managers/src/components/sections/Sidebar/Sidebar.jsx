import { Flex, Divider, Avatar, Heading, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu, FiHome, FiUsers, FiBox, FiBook } from "react-icons/fi";
import NavItem from "./NavItem";

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (title) => {
    setActiveItem(title);
  };

  return (
    <Flex
      pos='sticky'
      left='0'
      h='100vh'
      boxShadow='0 4px 12px 0 rgba(0,0,0,0.05)'
      w={navSize === "small" ? "75px" : "210px"}
      flexDir='column'
      justifyContent='space-between'
    >
      <Flex
        p='5%'
        flexDir='column'
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as='nav'
      >
        <IconButton
          background='none'
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            navSize === "small" ? setNavSize("large") : setNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title='Dashboard'
          active={activeItem === "Dashboard"}
          handleClick={handleItemClick}
          to='/dashboard'
        />
        <NavItem
          navSize={navSize}
          icon={FiUsers}
          title='Users'
          active={activeItem === "Users"}
          handleClick={handleItemClick}
        />
        <NavItem
          navSize={navSize}
          icon={FiBox}
          title='Products'
          active={activeItem === "Products"}
          handleClick={handleItemClick}
        />
        <NavItem
          navSize={navSize}
          icon={FiBook}
          title='Orders'
          active={activeItem === "Orders"}
          handleClick={handleItemClick}
        />
      </Flex>
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} alignItems='center'>
          <Avatar size='sm' />
          <Flex flexDir='column' ml={4} display={navSize === "small" ? "none" : "flex"}>
            <Heading as='h3' size='sm'>
              User Name
            </Heading>
            <Text color='grey'>Role</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
