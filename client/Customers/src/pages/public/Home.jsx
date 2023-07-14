import { Box, Heading, Text, Image, Flex, position, Circle } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

const Home = () => {
    return (
        <motion.div
            style={{
                minHeight: '100vh',
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

                    <ParallaxBannerLayer image="/2.png" speed={-30} />


                    <ParallaxBannerLayer>
                        <motion.div
                            style={{
                                display: 'inline-block',
                                width: '50%',
                                minWidth: '300px',
                                minHeight: '30%',
                                backgroundColor: 'RGBA(0, 0, 0, 0.92)',
                                padding: '2em',
                                marginTop: '60px',
                                borderRadius: '0 15px 15px 0',
                                boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.75)',
                            }}
                            initial={{ width: 0 }}
                            animate={{
                                width: '50%',
                            }}
                        >
                            <Heading as='h1' size='2xl' color='ShopYellow'>Welcome</Heading>
                            <Text color='gray.200' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facere doloremque ad asperiores, sit distinctio odit ea debitis adipisci fuga recusandae dolores, ex impedit quas reiciendis! Et commodi atque aperiam.</Text>
                        </motion.div>


                        <motion.img src='/welcome.png' width='300px'
                            style={{
                                display: 'inline-block',
                                maxWidth: '400px',
                                position: 'absolute',
                                right: '20%',
                                clipPath: "circle(50% at 50% 50%)",
                            }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.4,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.2
                                }
                            }}
                        />

                    </ParallaxBannerLayer>

                </ParallaxBanner>
            </Parallax>


        </motion.div >
    )
}

export default Home;