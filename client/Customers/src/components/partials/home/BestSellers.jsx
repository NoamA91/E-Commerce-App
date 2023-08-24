import {
    Box,
    Flex,
    Image,
    Text,
    Badge,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const getHoverShadow = (index) => {
        if (index === 0) return '0px 0px 20px #FFD700';
        if (index === 1) return '0px 0px 20px #C0C0C0';
        return '0px 0px 20px #CD7F32';
    };

    useEffect(() => {
        async function getBestSellers() {
            setLoading(true);
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/bestSellers`);
                setBestSellers(data.bestSellingProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching best sellers');
                setLoading(false);
            }
        }
        getBestSellers();
    }, []);

    const getBadge = (index) => {
        switch (index) {
            case 0:
                return '1st';
            case 1:
                return '2nd';
            case 2:
                return '3rd';
            default:
                return '';
        }
    }

    if (loading) {
        return (
            <Flex
                direction='column' alignItems='center' m={4}
            >
                <Flex
                    mx={{ md: '10%', lg: '20%' }}
                    justifyContent='center'
                    alignItems='center'
                    h={210}
                >
                    <BeatLoader
                        color='#35d0ba'
                        size={50}
                        margin={30}
                    />
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex
            mt={{ base: 0, md: 4 }}
            justifyContent='center'
        >
            <Flex
                justify='space-between'
                w={{ base: 'full', md: 'auto' }}
                flexDir={{ base: 'column', md: 'row' }}
            >
                {bestSellers.map((product, index) => (
                    <Link to={`/product/${product._id}`} key={product._id}>
                        <Box
                            as={motion.div}
                            display={{ base: 'flex', md: 'block' }}
                            bg='whiteAlpha.800'
                            borderRadius='lg'
                            shadow='inner'
                            overflow='hidden'
                            p={{ base: 3, md: 4 }}
                            position='relative'
                            m={2}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{
                                scale: 1.04,
                                boxShadow: getHoverShadow(index),
                                transition: {
                                    type: 'spring',
                                    bounce: 0,
                                    damping: 20,
                                    mass: 1,
                                    velocity: 2,
                                    stiffness: 200,
                                },
                            }}
                        >
                            <Badge
                                position='absolute'
                                top='0'
                                right='0'
                                m={2}
                                borderRadius='md'
                                fontSize={{ base: 'xl', md: '2xl' }}
                                colorScheme={
                                    index === 0 ? 'yellow' :
                                        index === 1 ? 'gray' :
                                            'orange'
                                }
                                color={
                                    index === 0 ? 'yellow.800' :
                                        index === 1 ? 'gray.600' :
                                            'orange.800'
                                }
                            >
                                {getBadge(index)}
                            </Badge>

                            <Image
                                src={product.image}
                                alt={product.title}
                                boxSize={{ base: '100px', md: '200px' }}
                                objectFit={{ base: 'cover', md: 'contain' }}
                                loading='lazy'
                                display={{ base: 'inline', md: 'auto' }}
                                mr={{ base: 3, md: 0 }}
                            />
                            <Flex mt={{ base: 3, md: 2 }}>
                                <Text
                                    mt={4}
                                    fontWeight='semibold'
                                    textAlign={{ md: 'center' }}
                                    color='gray.700'
                                >
                                    {product.title}
                                </Text>
                            </Flex>
                        </Box>
                    </Link>
                ))}
            </Flex>
        </Flex >
    );
}

export default BestSellers;