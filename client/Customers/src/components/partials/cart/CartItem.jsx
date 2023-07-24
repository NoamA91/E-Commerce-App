import {
    Box,
    Flex,
    Text,
    Image,
    Button
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
    const { adjustQuantity, removeFromCart } = useContext(CartContext);

    const handleIncreaseQuantity = () => {
        adjustQuantity(item._id, item.quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            adjustQuantity(item._id, item.quantity - 1);
        }
    }

    const handleRemoveFromCart = () => {
        removeFromCart(item._id);
    }

    return (
        <Box
            borderRadius="md"
            borderWidth="1px"
            p="4"
            my="2"
        >
            <Flex align="center">
                <Image
                    src={item.image}
                    alt={item.title}
                    boxSize="100px"
                    mr="4"
                />
                <Flex flex="1" flexDirection="column">
                    <Text fontSize="xl" mb="2">
                        {item.title}
                    </Text>
                    <Text fontSize="md" mb="2">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Flex>
                        <Button
                            colorScheme='teal'
                            onClick={handleIncreaseQuantity}
                            size="sm"
                        >
                            <AddIcon />
                        </Button>
                        <Text mx="2" fontSize='xl'>{item.quantity}</Text>
                        <Button
                            colorScheme='red'
                            onClick={handleDecreaseQuantity}
                            size="sm"
                        >
                            <MinusIcon />
                        </Button>
                    </Flex>
                </Flex>
                <Button
                    onClick={handleRemoveFromCart}
                    colorScheme="red"
                    variant="ghost"
                >
                    <DeleteIcon />
                </Button>
            </Flex>
        </Box>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),]).isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired
}

export default CartItem;
