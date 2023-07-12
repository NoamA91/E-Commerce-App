import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Image,
    Input
} from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Nav = () => {
    return (
        <>
            <Flex
                as='nav'
                w='100%'
                bg='blackAlpha.900'
                flexDir='column'
            >
                <Flex
                    pt={2}
                    justifyContent='center'
                >
                    <Box
                        borderRadius={20}
                        w='400px'
                        h='100px'
                        bgImage='url(/Logo.png)'
                        backgroundSize='cover'
                        backgroundPosition='center'
                    >
                    </Box>
                </Flex>
                <Flex
                    mt={2}
                    justifyContent='space-between'
                    mx={20}
                >

                    <ButtonGroup variant='ghost' gap={5}>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                        >
                            <Link to='/'>Home</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                        >
                            <Link to='/shop'>Shop</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                        >
                            <Link to='/about'>About Us</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                        >
                            <Link to='/contact'>Contact</Link>
                        </Button>
                        <Button
                            size='lg'
                            color='ShopTeal.200'
                        >
                            <Link to='/blog'>Blog</Link>
                        </Button>
                    </ButtonGroup>


                    <Flex>
                        <ButtonGroup variant='ghost' gap={5}>
                            <Button
                                size='lg'
                                color='ShopTeal.200'
                            >
                                Sign in / Register
                            </Button>
                            <Button
                                size='lg'
                                color='ShopTeal.200'
                            >
                                Cart
                            </Button>
                        </ButtonGroup>
                    </Flex>

                </Flex>
            </Flex >
        </>
    )
}

export default Nav