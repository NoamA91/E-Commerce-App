import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            as="footer"
            bg='blackAlpha.900'
            role="contentinfo"
            mx="auto"
            w='full'
            py="12"
            px={{ base: '4', md: '8' }}
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'start' }}
                justify="space-between"
            >
                <Text fontSize="sm" color='gray.400'>© 2023 PetShop, Inc. All rights reserved to Noam Ashkenazi.</Text>

                <Flex
                    direction={{ base: 'column-reverse', md: 'row' }}
                    align="center"
                    justify="center"
                    mt={{ base: '4', md: '0' }}
                >
                    <Link href="/" px="3" color="gray.400" fontSize="sm">Home</Link>
                    <Link href="/about" px="3" color="gray.400" fontSize="sm">About</Link>
                    <Link href="/contact" px="3" color="gray.400" fontSize="sm">Contact Us</Link>
                    <Link href="/shop" px="3" color="gray.400" fontSize="sm">All Products</Link>
                    <Link href="/blog" px="3" color="gray.400" fontSize="sm">Blog</Link>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Footer;
