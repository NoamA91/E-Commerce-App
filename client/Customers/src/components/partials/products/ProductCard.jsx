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
    Image,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <Card
            maxW='sm'
            h={420}
            as={motion.div}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CardBody
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                h={250}
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    borderRadius='lg'
                    w='100%'
                    h={200}
                    objectFit='cover'
                />
                <Stack
                    mt='5'
                >
                    <Heading as='h1' size='sm' isTruncated>{product.title}</Heading>

                    <Text color='red.600' fontSize='2xl'>
                        ${product.price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider color='gray.200' />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='yellow'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='teal'>
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