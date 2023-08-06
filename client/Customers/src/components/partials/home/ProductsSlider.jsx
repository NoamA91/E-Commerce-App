// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Box, Heading, Image, Text } from '@chakra-ui/react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/a11y';
// import 'swiper/css/autoplay';

// const ProductsSlider = () => {

//     const [products, setProducts] = useState([]);
//     const getAllProducts = async () => {
//         const source = axios.CancelToken.source();
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`,
//                 { cancelToken: source.token }
//             );
//             setProducts(response.data.products);

//         } catch (error) {
//             console.log(error);
//         }
//         return () => {
//             source.cancel('Request canceled');
//         }
//     }
//     useEffect(() => {
//         getAllProducts();
//     }, [])

//     return (
//         <Box p={10}>
//             <Heading as="h2" mb={6} textAlign="center">Our Products</Heading>
//             <Swiper
//                 slidesPerView={3}
//                 speed="500"
//                 loop="true"
//                 autoplay={{
//                     delay: 2000,
//                     disableOnInteraction: true
//                 }}
//                 navigation
//                 scrollbar
//                 a11y
//                 modules={[Navigation, Scrollbar, A11y, Autoplay]}
//             >
//                 {
//                     products.map(product => (
//                         <SwiperSlide key={product._id}>
//                             <Box
//                                 key={product._id}
//                                 p={4}
//                                 boxShadow="md"
//                                 bg="whiteAlpha.900"
//                                 borderRadius="md"
//                             >
//                                 <Image
//                                     objectFit="contain"
//                                     height="200px"
//                                     w='100%'
//                                     src={product.image}
//                                     alt={product.title}
//                                     loading="lazy"
//                                 />
//                                 <Text
//                                     mt={4}
//                                     fontWeight="bold"
//                                     textAlign='center'
//                                 >
//                                     {product.title}
//                                 </Text>
//                             </Box>
//                         </SwiperSlide>
//                     ))
//                 }
//             </Swiper >
//         </Box >
//     )
// }

// export default ProductsSlider

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';

const ProductsSlider = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        const source = axios.CancelToken.source();
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`, { cancelToken: source.token });
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
        return () => {
            source.cancel('Request canceled');
        };
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Box p={10}>
            <Heading as="h2" mb={6} textAlign="center" size="xl" color="gray.700">
                Our Products
            </Heading>
            <Swiper
                slidesPerView={3}
                speed={500}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                loop
                navigation
                scrollbar
                a11y
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                pagination={{ clickable: true }}
                spaceBetween={6}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <Box
                            p={4}
                            maxW={400}
                            boxShadow="base"
                            bg="whiteAlpha.900"
                            borderRadius="md"
                            transition="transform 0.2s, box-shadow 0.2s"
                            _hover={{
                                transform: 'scale(1.05)',
                                boxShadow: 'xl',
                            }}
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default ProductsSlider;
