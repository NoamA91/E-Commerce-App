import { Flex } from '@chakra-ui/react';
import { FiHome, FiUsers, FiBook, FiBox } from "react-icons/fi";
import { useState } from 'react';

import SidebarItem from './SidebarItem';

const SidebarContent = ({ onClose }) => {
    const [active, setActive] = useState("Dashboard");

    return (
        <Flex
            flexDir='column'
            mt={6}
            gap={4}
        >
            <SidebarItem icon={FiHome} label="Dashboard" to="/dashboard" onClose={onClose} active={active} onClick={() => setActive("Dashboard")} />
            <SidebarItem icon={FiUsers} label="Users" to="/users" onClose={onClose} active={active} onClick={() => setActive("Users")} />
            <SidebarItem icon={FiBox} label="Products" to="/products" onClose={onClose} active={active} onClick={() => setActive("Products")} />
            <SidebarItem icon={FiBook} label="Orders" to="/orders" onClose={onClose} active={active} onClick={() => setActive("Orders")} />
        </Flex>
    )
}

export default SidebarContent;