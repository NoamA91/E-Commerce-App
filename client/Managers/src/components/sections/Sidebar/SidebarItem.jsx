import { Text, Icon, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, label, to, onClose, active, onClick }) => {
    const isActive = label === active;

    return (
        <Button
            display='flex'
            justifyContent='flex-start'
            borderRadius={3}
            color={isActive ? 'green.400' : 'gray.300'}
            mt={3}
            p={0}
            h={50}
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
            borderRight={isActive ? '2px solid #32CD32' : 'none'}
        >
            <Link
                to={to}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '1.5rem',
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
