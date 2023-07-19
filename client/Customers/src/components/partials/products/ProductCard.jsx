import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Stack,
    Text,
    Image
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <Card
            maxW='sm'
        >
            <CardBody>
                <Image
                    src={product.image}
                    alt={product.title}
                    borderRadius='lg'
                    objectFit='cover'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.title}</Heading>

                    <Text color='blue.600' fontSize='2xl'>
                        {product.price}$
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard