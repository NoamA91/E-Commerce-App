import { Flex } from '@chakra-ui/react';
import { FiHome, FiUsers, FiBook, FiBox } from "react-icons/fi";
import SidebarItem from './SidebarItem';
import { useLocation } from 'react-router-dom';

const SidebarContent = ({ onClose }) => {
    // useLocation hook gives access to the current location.
    const location = useLocation();

    // We define a mapping from path prefixes to labels.
    const pathPrefixToLabel = {
        '/dashboard': 'Dashboard',
        '/users': 'Users',
        '/products': 'Products',
        '/orders': 'Orders',
    };

    // The active label is derived from the current path.
    const activePrefix = Object.keys(pathPrefixToLabel).find(prefix => location.pathname.startsWith(prefix));
    const active = pathPrefixToLabel[activePrefix];

    return (
        <Flex
            flexDir='column'
            mt={6}
            gap={1}
        >
            <SidebarItem icon={FiHome} label="Dashboard" to="/dashboard" onClose={onClose} active={active} />
            <SidebarItem icon={FiUsers} label="Users" to="/users" onClose={onClose} active={active} />
            <SidebarItem icon={FiBox} label="Products" to="/products" onClose={onClose} active={active} />
            <SidebarItem icon={FiBook} label="Orders" to="/orders" onClose={onClose} active={active} />
        </Flex>
    )
}

export default SidebarContent;