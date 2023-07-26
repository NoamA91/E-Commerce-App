import {
    Box,
    Image,
    Flex,
    Text,
    Heading
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import image1 from '/pexels-helena-lopes-1378849.jpg';
import image2 from "/pexels-snapwire-46024.jpg";


const About = () => (
    <Box
        as={motion.div}
        style={{ minHeight: "100vh", width: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <Flex direction="column" align="center" justify="center">
            <Box
                as="video"
                src="/video.mp4"
                alt="about video"
                objectFit='cover'
                width="100%"
                maxH="450px"
                autoPlay
                muted
                loop
            />

            <Box
                bg='ShopTeal.300'
                px={{ base: 6, md: 20 }}
                py={[5, 10]}
                borderRadius={{ base: 0, md: 10 }}
                maxW={{ base: '100%', md: '80%', lg: '60%' }}
                pos='relative'
                bottom={{ base: 0, lg: 5 }}
                boxShadow={{ md: '0px 0px 50px rgba(0, 0, 0, 0.3)' }}
            >
                <Heading
                    as='h1'
                    color='ShopYellow'
                >
                    With Us, no one pet-parents alone
                </Heading>
                <Text
                    color='white'
                    fontWeight='semibold'
                    mt={3}
                    fontSize={{ base: 'sm', md: 'lg' }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nam sint adipisci quam voluptate fugit impedit vel deserunt, accusamus necessitatibus Aut aperiam voluptatum quas mollitia error dignissimos, voluptatibus adipisci alias.
                </Text>
            </Box>

            <Flex
                direction={["column", "row"]}
                my={{ base: 0, md: 20 }}
                justify='center'
            >
                <Image
                    src={image1}
                    alt="Image 1"
                    width={["100%", "40%"]}
                    boxShadow={{ md: '0px 40px 60px rgba(0, 0, 0, 0.3)' }}
                />
                <Box
                    display='flex'
                    flexDir='column'
                    p={5}
                    w={{ base: '100%', md: '40%' }}
                    flex={{ base: 0, md: 0.5 }}
                    justifyContent='center'
                >
                    <Heading
                        as='h2'
                        fontSize={{ base: '2xl', md: '4xl' }}
                    >
                        Our customers always come first
                    </Heading>
                    <Box
                        id="divider"
                        h='2px'
                        borderRadius={5}
                        bg='gray.200'
                        w={250}
                        my={5}
                    />
                    <Text
                        fontSize={{ base: 'sm', md: 'lg' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod repellendus qui obcaecati ut placeat aperiam optio error corrupti quisquam minima!
                    </Text>
                    <br />
                    <Text
                        fontSize={{ base: 'sm', md: 'lg' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius enim consectetur nihil ducimus, corrupti possimus!
                    </Text>
                </Box>
            </Flex>

            <Flex
                direction={["column-reverse", "row-reverse"]}
                my={{ base: 5, md: 20 }}
                justify='center'
            >
                <Image
                    src={image2}
                    alt="Image 2"
                    width={["100%", "50%"]}
                    boxShadow={{ md: '0px 40px 60px rgba(0, 0, 0, 0.3)' }}
                    ml={5}
                />
                <Box
                    display='flex'
                    flexDir='column'
                    p={5}
                    pr={{ base: 0, md: 5 }}
                    w={{ base: '100%', md: '40%' }}
                    flex={{ base: 0, md: 0.5 }}
                    justifyContent='center'
                >
                    <Heading
                        as='h2'
                        fontSize={{ base: '2xl', md: '4xl' }}
                    >
                        Pets are what get us out of bed every day
                    </Heading>
                    <Box
                        id="divider"
                        h='2px'
                        borderRadius={5}
                        bg='gray.200'
                        w={250}
                        my={5}
                    />
                    <Text
                        fontSize={{ base: 'sm', md: 'lg' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod repellendus qui obcaecati ut placeat aperiam optio error corrupti quisquam minima!
                    </Text>
                    <br />
                    <Text
                        fontSize={{ base: 'sm', md: 'lg' }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius enim consectetur nihil ducimus, corrupti possimus!
                    </Text>
                </Box>
            </Flex>
        </Flex >
    </Box >
);

export default About;

