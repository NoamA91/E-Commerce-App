import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom/dist';

const ProductsSlider = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        const source = axios.CancelToken.source();
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`, { cancelToken: source.token });
            setProducts(response.data.products);
        } catch (error) {
            console.log('Error in GetAllProducts');
        }
        return () => {
            source.cancel('Request canceled');
        };
    };

    useEffect(() => {
        getAllProducts();
    }, []);

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
                                as={motion.div}
                                p={4}
                                m={10}
                                maxW={400}
                                minW={200}
                                minH={300}
                                bg="whiteAlpha.800"
                                borderRadius="md"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: 'xl',
                                    transition: {
                                        duration: 2,
                                        type: 'spring',
                                        bounce: 0,
                                        damping: 20,
                                        mass: 2,
                                        velocity: 3,
                                        stiffness: 500,
                                    }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    objectFit="contain"
                                    height="200px"
                                    w="100%"
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                />
                                <Text mt={4} fontWeight="semibold" textAlign="center" color="gray.700">
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