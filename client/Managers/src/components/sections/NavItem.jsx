import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from '../sections/NavHoverBox'

const NavItem = ({ navSize, title, icon, active, description }) => {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
        >
            <Menu placement='right'>
                <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
                    w={navSize === "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "A82AAAD" : "grey.500"} />
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList>
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default NavItem