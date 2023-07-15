import { Box, Heading, Text, Image, Flex, position, Circle, Grid, GridItem, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

const Home = () => {
    return (
        <motion.div
            style={{
                width: '100%'
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
            <Parallax
                pages={3}
            >


                <ParallaxBanner style={{
                    aspectRatio: '2 / 1.2',
                    height: '100vh',
                }}>

                    <ParallaxBannerLayer image="/2.png" speed={-40} />

                    <ParallaxBannerLayer>
                        <Flex
                            flexDir={{ base: 'column', md: 'row' }}
                        >
                            <Box
                                mt={{ base: '1rem', md: '10rem' }}
                                ml={{ base: '1rem', md: '10rem' }}
                            >
                                <motion.div
                                    style={{
                                        minWidth: '300px',
                                        padding: '2rem',
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        scale: [0.9, 1],
                                        opacity: 1,
                                        transition: { duration: 0.6, delay: 0.1 }
                                    }}
                                >
                                    <Heading
                                        as='h1'
                                        size={{ base: 'xl', md: '3xl' }}
                                        color='ShopYellow'
                                    >
                                        Online Shopping <br /> Make Life Easier
                                    </Heading>
                                    <Text
                                        mt={4}
                                        color='gray.200'

                                        fontSize={{ base: 'md', md: 'lg' }}
                                        lineHeight='2rem'
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facere doloremque ad asperiores, sit distinctio odit ea debitis adipisci fuga recusandae dolores, ex impedit quas reiciendis! Et commodi atque aperiam.
                                    </Text>
                                    <Button
                                        mt={10}
                                        bg='ShopYellow'
                                        color='black'
                                        _hover={{
                                            bg: 'ShopTeal.100',
                                        }}
                                    >
                                        Shop Now
                                    </Button>
                                </motion.div>
                            </Box>

                            <Box>
                                <Grid
                                    templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
                                    templateRows={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
                                    gap={4}
                                    m={{ base: '1rem', md: '7rem' }}
                                >
                                    <GridItem
                                        minW={{ base: '150px', md: '250px' }}
                                        maxW='300px'
                                        height={{ base: '150px', md: '250px' }}
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
                                                transition: { duration: 0.7, delay: 0.2 }
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
                                                transition: { duration: 0.7, delay: 0.4 }
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
                                                transition: { duration: 0.7, delay: 0.6 }
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
                                                transition: { duration: 0.7, delay: 0.8 }
                                            }}
                                        >
                                        </motion.div>
                                    </GridItem>
                                </Grid>
                            </Box>
                        </Flex>
                    </ParallaxBannerLayer>
                </ParallaxBanner>

            </Parallax>
        </motion.div >
    )
}

export default Home;