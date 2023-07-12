import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';



const Home = () => {
    return (
        <motion.div
            style={{
                minHeight: '100vh',
                width: '100%',
            }}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            <motion.div
                style={{

                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Box
                    minW={300}
                    bg='blackAlpha.900'
                >
                    <Heading
                        as='h1'
                        size='2xl'
                        color='ShopYellow'
                    >
                        Welcome</Heading>
                    <Text
                        color='gray.200'
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facere doloremque ad asperiores, sit distinctio odit ea debitis adipisci fuga recusandae dolores, ex impedit quas reiciendis! Et commodi atque aperiam.</Text>
                </Box>
            </motion.div>

        </motion.div>
    )
}

export default Home