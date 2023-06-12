import {
    Flex,
    Divider,
    Avatar,
    Heading,
    Text,
    IconButton
} from "@chakra-ui/react"
import { useState } from "react"

import { FiMenu, FiHome } from "react-icons/fi";
import NavItem from "./NavItem";

const Sidebar = () => {
    const [navSize, setNavSize] = useState("large");
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            mt="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            borderRadius={navSize == "small" ? "15" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: "none" }}
                    icon={<FiMenu />}
                    onClick={() => {
                        navSize === "small" ? setNavSize("large") : setNavSize("small");
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="" />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" active />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
            </Flex>
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider
                    display={navSize == "small" ? "none" : "flex"}
                />
                <Flex mt={4} alignItems="center">
                    <Avatar size="sm" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">User Name</Heading>
                        <Text color="grey">Role</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar