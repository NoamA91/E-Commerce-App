import { Text, Icon, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, label, to }) => (
    <Button
        display='flex'
        pa={8}
        borderRadius={4}
        backgroundColor="gray.800"
        color='#fafafa'
        mt={3}
        _hover={{
            bgColor: 'gray.700',
        }}
    >
        <Link
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Icon as={icon} w={6} h={6} />
            <Text ml={3}>{label}</Text>
        </Link>
    </Button >
);

export default SidebarItem;
