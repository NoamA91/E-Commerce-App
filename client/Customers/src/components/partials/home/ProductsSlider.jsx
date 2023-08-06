import { useEffect, useState } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { register } from 'swiper/element/bundle';
register();


const ProductsSlider = () => {

    const [topProducts, setTopProducts] = useState([]);
    const getAllProducts = async () => {
        const source = axios.CancelToken.source();
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products/getAll`,
                { cancelToken: source.token }
            );
            setTopProducts(response.data.products);

        } catch (error) {
            console.log(error);
        }
        return () => {
            source.cancel('Request canceled');
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Box p={10}>
            <Heading as="h2" mb={6} textAlign="center">Our Products</Heading>
            <swiper-container
                slides-per-view="3"
                speed="500"
                loop="true"
                css-mode="true"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true
                }}
            >
                {topProducts.map(product => (
                    <SwiperSlide key={product._id}>
                        <Box
                            key={product._id}
                            p={4}
                            boxShadow="md"
                            bg="whiteAlpha.900"
                            borderRadius="md"
                        >
                            <Image
                                objectFit="contain"
                                height="200px"
                                w='100%'
                                src={product.image}
                                alt={product.name}
                            />
                            <Text
                                mt={4}
                                fontWeight="bold"
                                textAlign='center'
                            >
                                {product.title}
                            </Text>
                        </Box>
                    </SwiperSlide>
                ))}
            </swiper-container >
        </Box>
    )
}

export default ProductsSlider