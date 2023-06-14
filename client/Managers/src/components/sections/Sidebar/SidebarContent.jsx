import { Flex } from '@chakra-ui/react';
import { FiHome, FiUsers, FiBook, FiBox } from "react-icons/fi";

import SidebarItem from './SidebarItem';

const SidebarContent = ({onClose}) => {
    return(
    <Flex
        flexDir='column'
        mt={6}
        gap={4}
    >
        <SidebarItem icon={FiHome} label="Dashboard" to="/dashboard" onClose={onClose}/>
        <SidebarItem icon={FiUsers} label="Users" to="/users" onClose={onClose}/>
        <SidebarItem icon={FiBox} label="Products" to="/products" onClose={onClose} />
        <SidebarItem icon={FiBook} label="Orders" to="/orders" onClose={onClose} />

    </Flex>
    )
}

export default SidebarContent;
