import { Flex } from '@chakra-ui/react';
import { FiHome, FiUsers, FiBook, FiBox } from "react-icons/fi";

import SidebarItem from './SidebarItem';

const SidebarContent = () => (

    <Flex
        flexDir='column'
        mt={6}
        gap={4}
    >
        <SidebarItem icon={FiHome} label="Dashboard" to="/dashboard" />
        <SidebarItem icon={FiUsers} label="Users" to="" />
        <SidebarItem icon={FiBox} label="Products" to="" />
        <SidebarItem icon={FiBook} label="Orders" to="" />

    </Flex>
);

export default SidebarContent;
