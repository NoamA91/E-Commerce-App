import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            as="footer"
            bg='blackAlpha.900'
            role="contentinfo"
            mx="auto"
            w='full'
            py={{ base: '4', md: '12' }}
            px={{ base: '4', md: '8' }}
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'start' }}
                justify="space-between"
            >
                <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray'>© 2023 ThePetShop, Inc. All rights reserved to Noam Ashkenazi.</Text>

                <Flex
                    direction={{ base: 'column-reverse', md: 'row' }}
                    align="center"
                    justify="center"
                    mt={{ base: '2', md: '0' }}
                    py={{ base: '3', md: '0' }}
                >
                    <Link py={{ base: '1', md: '0' }}
                        href="/" px="3" color="gray" fontSize="sm" _hover={{ color: 'white' }}>Home</Link>
                    <Link py={{ base: '1', md: '0' }}
                        href="/about" px="3" color="gray" fontSize="sm" _hover={{ color: 'white' }}>About</Link>
                    <Link py={{ base: '1', md: '0' }}
                        href="/contact" px="3" color="gray" fontSize="sm" _hover={{ color: 'white' }}>Contact Us</Link>
                    <Link py={{ base: '1', md: '0' }}
                        href="/shop" px="3" color="gray" fontSize="sm" _hover={{ color: 'white' }}>All Products</Link>
                    <Link py={{ base: '1', md: '0' }}
                        href="/blog" px="3" color="gray" fontSize="sm" _hover={{ color: 'white' }}>Blog</Link>
                </Flex>
            </Flex>
        </Box >
    );
}

export default Footer;
