import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom/dist';
import { BeatLoader } from 'react-spinners';

const ProductsSlider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllProducts = async () => {
        setLoading(true);
        const source = axios.CancelToken.source();
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`, { cancelToken: source.token });
            setProducts(response.data.products);
            setLoading(false);
        } catch (error) {
            console.log('Error in GetAllProducts');
            setLoading(false);
        }
        return () => {
            source.cancel('Request canceled');
        };
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    if (loading) {
        return (
            <Flex
                mx={{ md: '10%', lg: '20%' }}
                justifyContent='center'
                alignItems='center'
                h={310}
            >
                <BeatLoader
                    color='#35d0ba'
                    size={50}
                    margin={30}
                />
            </Flex>
        );
    }

    return (
        <Box
            mx={{ md: '10%', lg: '20%' }}
        >
            <Swiper
                slidesPerView={3}
                speed={500}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                loop
                scrollbar
                modules={[Scrollbar, Autoplay]}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Box
                                style={{
                                    'WebkitFontSmoothing': 'antialiased',
                                    'textRendering': 'optimizeLegibility'
                                }}
                                as={motion.div}
                                p={4}
                                m={{ base: 5, md: 10 }}
                                maxW={400}
                                minW={200}
                                minH={300}
                                bg='whiteAlpha.800'
                                borderRadius='md'
                                whileHover={{
                                    scale: 1.05,
                                    transition: {
                                        duration: 2,
                                        type: 'spring',
                                        bounce: 0,
                                        damping: 20,
                                        mass: 2,
                                        velocity: 2,
                                        stiffness: 500,
                                    },
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    objectFit='contain'
                                    h='200px'
                                    w='100%'
                                    src={product.image}
                                    alt={product.title}
                                    loading='lazy'
                                />
                                <Text mt={4} fontWeight='semibold' textAlign='center' color='gray.700'>
                                    {product.title}
                                </Text>
                            </Box>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box >
    );
};

export default ProductsSlider;