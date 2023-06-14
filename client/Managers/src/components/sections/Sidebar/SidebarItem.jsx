import { Text, Icon, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, label, to, onClose, active, onClick }) => {
    const isActive = label === active;

    return (
        <Button
            display='flex'
            pa={8}
            borderRadius={4}
            color={isActive ? 'green.400' : 'gray.300'}
            mt={3}
            onClick={onClick}
            _hover={{
                bgColor: 'gray.700',
            }}
            _active={{
                bgColor: 'gray.600',
                transform: 'scale(0.97)',
                color: 'green.200',
            }}
            bgColor={isActive ? 'gray.700' : 'gray.800'}
        >
            <Link
                to={to}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                }}
                onClick={onClose}
            >
                <Icon as={icon} w={6} h={6} />
                <Text ml={3}>{label}</Text>
            </Link>
        </Button >
    )
};

export default SidebarItem;
