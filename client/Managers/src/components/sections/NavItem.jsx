import { Flex, Text, Icon, Link, Menu, MenuButton, Tooltip } from "@chakra-ui/react";

const NavItem = ({ navSize, title, icon, active, handleClick }) => {
  return (
    <Flex
      mt={30}
      flexDir='column'
      w='100%'
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement='right'>
        {navSize === "small" ? (
          <Tooltip borderRadius={5} hasArrow label={title} placement='right'>
            <Link
              backgroundColor={active ? "#AEC8CA" : "transparent"}
              p={3}
              borderRadius={8}
              _hover={{ backgroundColor: "#AEC8CA" }}
              w={navSize === "large" && "100%"}
              onClick={() => handleClick(title)}
            >
              <MenuButton w='100%'>
                <Flex>
                  <Icon as={icon} fontSize='xl' color={active ? "A82AAAD" : "grey.500"} />
                  <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                    {title}
                  </Text>
                </Flex>
              </MenuButton>
            </Link>
          </Tooltip>
        ) : (
          <Link
            backgroundColor={active ? "#AEC8CA" : "transparent"}
            p={3}
            borderRadius={8}
            _hover={{ backgroundColor: "#AEC8CA" }}
            w={navSize === "large" && "100%"}
            onClick={() => handleClick(title)}
          >
            <MenuButton w='100%'>
              <Flex>
                <Icon as={icon} fontSize='xl' color={active ? "A82AAAD" : "grey.500"} />
                <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        )}
      </Menu>
    </Flex>
  );
};

export default NavItem;
