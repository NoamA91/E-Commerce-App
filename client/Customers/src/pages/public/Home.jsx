// import {
//     Box,
//     Heading,
//     Text,
//     Flex,
//     Grid,
//     GridItem,
//     Button
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
// import { Helmet } from 'react-helmet';
// import ProductsSlider from '../../components/partials/home/ProductsSlider';
// import BestSellers from '../../components/partials/home/BestSellers';

// const Home = () => {
//     return (
//         <>
//             <Helmet>
//                 <title>PetShop | Home</title>
//                 <meta name='description' content='homepage' />
//             </Helmet>
//             <motion.div
//                 style={{
//                     width: '100%',
//                     minHeight: '100vh'
//                 }}
//                 initial={{ opacity: 0 }}
//                 animate={{
//                     opacity: 1,
//                     transition: {
//                         duration: 0.4,
//                         delayChildren: 0.3,
//                         staggerChildren: 0.2
//                     }
//                 }}
//                 exit={{ opacity: 0 }}
//             >
//                 <Parallax>

//                     <ParallaxBanner style={{
//                         aspectRatio: '2 / 1',
//                         minHeight: '100vh',
//                     }}>

//                         <ParallaxBannerLayer image='/2.png' speed={-40} />

//                         <ParallaxBannerLayer>
//                             <Flex
//                                 flexDir={{ base: 'column', md: 'row' }}
//                             >
//                                 {/* Heading */}
//                                 <Box
//                                     mt={{ base: '1rem', md: '10rem' }}
//                                     ml={{ base: '1rem', md: '10rem' }}
//                                     p={{ base: '2rem', md: '2rem' }}
//                                 >
//                                     <Box
//                                         as={motion.div}
//                                         minW={{ base: '300px', md: '500px' }}
//                                         initial={{ opacity: 0 }}
//                                         animate={{
//                                             scale: [0.8, 1],
//                                             opacity: 1,
//                                             transition: { duration: 0.6, delay: 0.1 }
//                                         }}
//                                     >
//                                         <Box position='relative' bottom={5}>
//                                             <Heading
//                                                 as='h1'
//                                                 size={{ base: '2xl', md: '4xl' }}
//                                                 color='ShopYellow'
//                                                 fontWeight='extrabold'
//                                                 p={3}
//                                                 userSelect='none'
//                                                 position='absolute'
//                                                 top={0}
//                                                 left={0}
//                                             >
//                                                 Welcome to <br /> The Pet Shop
//                                             </Heading>
//                                             <Heading
//                                                 as='h1'
//                                                 size={{ base: '2xl', md: '4xl' }}
//                                                 color='black'
//                                                 zIndex={-1}
//                                                 fontWeight='extrabold'
//                                                 p={2}
//                                                 userSelect='none'
//                                                 position='absolute'
//                                                 top={'10px'}
//                                                 left={'10px'}
//                                             >
//                                                 Welcome to <br /> The Pet Shop
//                                             </Heading>
//                                             <Heading
//                                                 as='h1'
//                                                 size={{ base: '2xl', md: '4xl' }}
//                                                 color='ShopTeal.300'
//                                                 zIndex={-2}
//                                                 fontWeight='extrabold'
//                                                 p={1}
//                                                 userSelect='none'
//                                                 position='absolute'
//                                                 top={'17px'}
//                                                 left={'17px'}
//                                             >
//                                                 Welcome to <br /> The Pet Shop
//                                             </Heading>
//                                         </Box>

//                                         <Box h={{ base: '90px', md: '150px' }}></Box>

//                                         <Text
//                                             mt={4}
//                                             color='gray.200'
//                                             fontSize={{ base: 'md', md: 'lg' }}
//                                             lineHeight='2rem'
//                                             fontWeight='semibold'
//                                         >
//                                             Experience the joy of finding everything your pet needs under one roof. From tasty treats to playful toys, we have it all. Shop with us and let&apos;s make your furry friend&apos;s life even more enjoyable and vibrant!
//                                         </Text>



//                                         <Link to='/products'>
//                                             <motion.div
//                                                 whileHover={{ scale: 1.030 }}
//                                                 style={{
//                                                     display: 'inline-block'
//                                                 }}
//                                             >
//                                                 <Button
//                                                     mt={10}
//                                                     size={{ base: 'md', md: 'lg' }}
//                                                     bg='ShopYellow'
//                                                     color='black'
//                                                     _hover={{
//                                                         bg: 'ShopTeal.100',
//                                                     }}
//                                                 >
//                                                     Shop Now
//                                                 </Button>
//                                             </motion.div>
//                                         </Link>
//                                     </Box>
//                                 </Box>

//                                 <Box>
//                                     {/* desktop images */}
//                                     <Grid
//                                         display={{ base: 'none', md: 'none', lg: 'grid' }}
//                                         templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
//                                         templateRows={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
//                                         gap={4}
//                                         m={{ md: '7rem' }}
//                                     >
//                                         <GridItem
//                                             minW={{ md: '250px' }}
//                                             maxW='300px'
//                                             height={{ md: '250px' }}
//                                         >
//                                             <motion.div
//                                                 style={{
//                                                     boxShadow: '-12px -10px 15px 9px rgba(0, 0, 0, 0.75)',
//                                                     backgroundImage: 'url(/welcome.png)',
//                                                     backgroundSize: 'cover',
//                                                     borderRadius: '15px',
//                                                     height: '100%',
//                                                 }}
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{
//                                                     scale: [0, 1],
//                                                     opacity: 1,
//                                                     transition: { duration: 2, delay: 0.2, type: 'spring' }
//                                                 }}
//                                             >
//                                             </motion.div>
//                                         </GridItem>
//                                         <GridItem
//                                             minW={{ base: '150px', md: '250px' }}
//                                             maxW='300px'
//                                             height={{ base: '150px', md: '250px' }}
//                                         >
//                                             <motion.div
//                                                 style={{
//                                                     boxShadow: '12px -10px 15px 9px rgba(0, 0, 0, 0.75)',
//                                                     backgroundImage: 'url(/phone.jpeg)',
//                                                     backgroundSize: 'cover',
//                                                     borderRadius: '15px',
//                                                     height: '100%',
//                                                 }}
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{
//                                                     scale: [0, 1],
//                                                     opacity: 1,
//                                                     transition: { duration: 2, delay: 0.4, type: 'spring' }
//                                                 }}
//                                             >
//                                             </motion.div>
//                                         </GridItem>
//                                         <GridItem
//                                             minW={{ base: '150px', md: '250px' }}
//                                             maxW='300px'
//                                             height={{ base: '150px', md: '250px' }}
//                                         >
//                                             <motion.div
//                                                 style={{
//                                                     boxShadow: '-12px 10px 15px 9px rgba(0, 0, 0, 0.75)',
//                                                     backgroundImage: 'url(/AnimalsCart.jpeg)',
//                                                     backgroundSize: 'cover',
//                                                     borderRadius: '15px',
//                                                     height: '100%',
//                                                 }}
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{
//                                                     scale: [0, 1],
//                                                     opacity: 1,
//                                                     transition: { duration: 2, delay: 0.6, type: 'spring' }
//                                                 }}
//                                             >
//                                             </motion.div>
//                                         </GridItem>
//                                         <GridItem
//                                             minW={{ base: '150px', md: '250px' }}
//                                             maxW='300px'
//                                             height={{ base: '150px', md: '250px' }}
//                                         >
//                                             <motion.div
//                                                 style={{
//                                                     boxShadow: '12px 10px 15px 9px rgba(0, 0, 0, 0.75)',
//                                                     backgroundImage: 'url(/Playing.png)',
//                                                     backgroundSize: 'cover',
//                                                     borderRadius: '15px',
//                                                     height: '100%',
//                                                 }}
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{
//                                                     scale: [0, 1],
//                                                     opacity: 1,
//                                                     transition: { duration: 2, delay: 0.8, type: 'spring' }
//                                                 }}
//                                             >
//                                             </motion.div>
//                                         </GridItem>
//                                     </Grid>
//                                 </Box>
//                             </Flex>
//                         </ParallaxBannerLayer>
//                     </ParallaxBanner>

//                     <Box
//                         py={8}
//                         bg='blackAlpha.900'
//                     >
//                         <Heading
//                             as='h2'
//                             textAlign='center'
//                             size='2xl'
//                             color='ShopYellow'
//                             fontWeight='extrabold'
//                         >
//                             Our Products
//                         </Heading>
//                     </Box>

//                     <ParallaxBanner
//                         style={{
//                             minHeight: '100vh',
//                         }}
//                     >
//                         <ParallaxBannerLayer image='/cat-3483146_1280.jpg' speed={-20} />
//                         <ParallaxBannerLayer>
//                             <Box h='100%' mt={10}>
//                                 <ProductsSlider />
//                                 <Flex justifyContent='center'>
//                                     <Text
//                                         fontSize={{ base: '40px', md: '50px' }}
//                                         mt={{ base: 0, md: 10 }}
//                                         color='ShopYellow'
//                                         fontWeight='extrabold'
//                                         p={3}
//                                         userSelect='none'
//                                     >
//                                         Best Sellers
//                                     </Text>
//                                     <Text
//                                         position='absolute'
//                                         fontSize={{ base: '40px', md: '50px' }}
//                                         mt={{ base: 0, md: 10 }}
//                                         color='black'
//                                         zIndex={-1}
//                                         fontWeight='extrabold'
//                                         p={2}
//                                         userSelect='none'

//                                     >
//                                         Best Sellers
//                                     </Text>
//                                     <Text
//                                         position='absolute'
//                                         fontSize={{ base: '40px', md: '50px' }}
//                                         mt={{ base: 0, md: 10 }}
//                                         color='ShopTeal.300'
//                                         zIndex={-2}
//                                         fontWeight='extrabold'
//                                         p={1}
//                                         userSelect='none'
//                                     >
//                                         Best Sellers
//                                     </Text>
//                                 </Flex>
//                                 <BestSellers />
//                             </Box>
//                         </ParallaxBannerLayer>
//                     </ParallaxBanner>

//                 </Parallax>
//             </motion.div >
//         </>
//     )
// }

// export default Home;

import {
    Box,
    Heading,
    Text,
    Flex,
    Grid,
    GridItem,
    Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { Helmet } from 'react-helmet';
import ProductsSlider from '../../components/partials/home/ProductsSlider';
import BestSellers from '../../components/partials/home/BestSellers';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>PetShop | Home</title>
                <meta name='description' content='homepage' />
            </Helmet>
            <motion.div
                style={{
                    width: '100%',
                    minHeight: '100vh'
                }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.4,
                        delayChildren: 0.3,
                        staggerChildren: 0.2
                    }
                }}
                exit={{ opacity: 0 }}
            >
                <Parallax>

                    <ParallaxBanner style={{
                        aspectRatio: '2 / 1',
                        minHeight: '100vh',
                    }}>

                        <ParallaxBannerLayer image='/2.png' speed={-40} />

                        <ParallaxBannerLayer>
                            <Flex
                                flexDir={{ base: 'column', md: 'row' }}
                            >
                                {/* Heading */}
                                <Box
                                    mt={{ base: '1rem', md: '10rem' }}
                                    ml={{ base: '1rem', md: '10rem' }}
                                    p={{ base: '2rem', md: '2rem' }}
                                >
                                    <Box
                                        as={motion.div}
                                        minW={{ base: '300px', md: '500px' }}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            scale: [0.8, 1],
                                            opacity: 1,
                                            transition: { duration: 0.6, delay: 0.1 }
                                        }}
                                    >
                                        <Box position='relative' bottom={5}>
                                            <Heading
                                                as='h1'
                                                size={{ base: '2xl', md: '4xl' }}
                                                color='ShopYellow'
                                                fontWeight='extrabold'
                                                p={3}
                                                userSelect='none'
                                                position='absolute'
                                                top={0}
                                                left={0}
                                            >
                                                Welcome to <br /> The Pet Shop
                                            </Heading>
                                            <Heading
                                                as='h1'
                                                size={{ base: '2xl', md: '4xl' }}
                                                color='black'
                                                zIndex={-1}
                                                fontWeight='extrabold'
                                                p={2}
                                                userSelect='none'
                                                position='absolute'
                                                top={'10px'}
                                                left={'10px'}
                                            >
                                                Welcome to <br /> The Pet Shop
                                            </Heading>
                                            <Heading
                                                as='h1'
                                                size={{ base: '2xl', md: '4xl' }}
                                                color='ShopTeal.300'
                                                zIndex={-2}
                                                fontWeight='extrabold'
                                                p={1}
                                                userSelect='none'
                                                position='absolute'
                                                top={'17px'}
                                                left={'17px'}
                                            >
                                                Welcome to <br /> The Pet Shop
                                            </Heading>
                                        </Box>

                                        <Box h={{ base: '90px', md: '150px' }}></Box>

                                        <Text
                                            mt={4}
                                            color='gray.200'
                                            fontSize='lg'
                                            lineHeight='2rem'
                                            fontWeight='semibold'
                                        >
                                            Experience the joy of finding everything your pet needs under one roof. From tasty treats to playful toys, we have it all. Shop with us and let&apos;s make your furry friend&apos;s life even more enjoyable and vibrant!
                                        </Text>



                                        <Link to='/products'>
                                            <motion.div
                                                whileHover={{ scale: 1.030 }}
                                                style={{
                                                    display: 'inline-block'
                                                }}
                                            >
                                                <Button
                                                    mt={10}
                                                    size='lg'
                                                    bg='ShopYellow'
                                                    color='black'
                                                    _hover={{
                                                        bg: 'ShopTeal.100',
                                                    }}
                                                >
                                                    Shop Now
                                                </Button>
                                            </motion.div>
                                        </Link>
                                    </Box>
                                </Box>

                                <Box>
                                    {/* desktop images */}
                                    <Grid
                                        display={{ base: 'none', md: 'none', lg: 'grid' }}
                                        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                                        templateRows={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                                        gap={4}
                                        m={{ md: '7rem' }}
                                    >
                                        <GridItem
                                            minW={{ md: '250px' }}
                                            maxW='300px'
                                            height={{ md: '250px' }}
                                        >
                                            <motion.div
                                                style={{
                                                    boxShadow: '-12px -10px 15px 9px rgba(0, 0, 0, 0.75)',
                                                    backgroundImage: 'url(/welcome.png)',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '15px',
                                                    height: '100%',
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    scale: [0, 1],
                                                    opacity: 1,
                                                    transition: { duration: 2, delay: 0.2, type: 'spring' }
                                                }}
                                            >
                                            </motion.div>
                                        </GridItem>
                                        <GridItem
                                            minW={{ base: '150px', md: '250px' }}
                                            maxW='300px'
                                            height={{ base: '150px', md: '250px' }}
                                        >
                                            <motion.div
                                                style={{
                                                    boxShadow: '12px -10px 15px 9px rgba(0, 0, 0, 0.75)',
                                                    backgroundImage: 'url(/phone.jpeg)',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '15px',
                                                    height: '100%',
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    scale: [0, 1],
                                                    opacity: 1,
                                                    transition: { duration: 2, delay: 0.4, type: 'spring' }
                                                }}
                                            >
                                            </motion.div>
                                        </GridItem>
                                        <GridItem
                                            minW={{ base: '150px', md: '250px' }}
                                            maxW='300px'
                                            height={{ base: '150px', md: '250px' }}
                                        >
                                            <motion.div
                                                style={{
                                                    boxShadow: '-12px 10px 15px 9px rgba(0, 0, 0, 0.75)',
                                                    backgroundImage: 'url(/AnimalsCart.jpeg)',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '15px',
                                                    height: '100%',
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    scale: [0, 1],
                                                    opacity: 1,
                                                    transition: { duration: 2, delay: 0.6, type: 'spring' }
                                                }}
                                            >
                                            </motion.div>
                                        </GridItem>
                                        <GridItem
                                            minW={{ base: '150px', md: '250px' }}
                                            maxW='300px'
                                            height={{ base: '150px', md: '250px' }}
                                        >
                                            <motion.div
                                                style={{
                                                    boxShadow: '12px 10px 15px 9px rgba(0, 0, 0, 0.75)',
                                                    backgroundImage: 'url(/Playing.png)',
                                                    backgroundSize: 'cover',
                                                    borderRadius: '15px',
                                                    height: '100%',
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    scale: [0, 1],
                                                    opacity: 1,
                                                    transition: { duration: 2, delay: 0.8, type: 'spring' }
                                                }}
                                            >
                                            </motion.div>
                                        </GridItem>
                                    </Grid>
                                </Box>
                            </Flex>
                        </ParallaxBannerLayer>
                    </ParallaxBanner>

                    <Box
                        py={8}
                        bg='blackAlpha.900'
                    >
                        <Heading
                            as='h2'
                            textAlign='center'
                            size='2xl'
                            color='ShopYellow'
                            fontWeight='extrabold'
                        >
                            Our Products
                        </Heading>
                    </Box>

                    <ParallaxBanner
                        style={{ minHeight: '100vh' }}
                    >
                        <ParallaxBannerLayer image='/cat-3483146_1280.jpg' speed={-20} />
                        <ParallaxBannerLayer>
                            <Box h='100%' mt={10}>
                                <ProductsSlider />
                                <Flex justifyContent='center'>
                                    <Text
                                        fontSize={{ base: '40px', md: '50px' }}
                                        mt={{ base: 0, md: 10 }}
                                        color='ShopYellow'
                                        fontWeight='extrabold'
                                        p={3}
                                        userSelect='none'
                                    >
                                        Best Sellers
                                    </Text>
                                    <Text
                                        position='absolute'
                                        fontSize={{ base: '40px', md: '50px' }}
                                        mt={{ base: 0, md: 10 }}
                                        color='black'
                                        zIndex={-1}
                                        fontWeight='extrabold'
                                        p={2}
                                        userSelect='none'

                                    >
                                        Best Sellers
                                    </Text>
                                    <Text
                                        position='absolute'
                                        fontSize={{ base: '40px', md: '50px' }}
                                        mt={{ base: 0, md: 10 }}
                                        color='ShopTeal.300'
                                        zIndex={-2}
                                        fontWeight='extrabold'
                                        p={1}
                                        userSelect='none'
                                    >
                                        Best Sellers
                                    </Text>
                                </Flex>
                                <BestSellers />
                            </Box>
                        </ParallaxBannerLayer>
                    </ParallaxBanner>

                </Parallax>
            </motion.div >
        </>
    )
}

export default Home;