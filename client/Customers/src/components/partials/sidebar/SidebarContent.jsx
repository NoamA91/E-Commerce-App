import { PropTypes } from 'prop-types'
import { Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const SidebarContent = ({ onClose }) => {
    return (
        <Flex
            flexDir='column'
            mt={6}
            gap={5}
        >
            <Link to='/'
                onClick={onClose}
            >
                <Button
                    w='100%'
                    bg='ShopTeal.200'
                    mt={2}
                    _hover={{
                        bg: 'ShopTeal.100',
                    }}
                >
                    Home
                </Button>
            </Link>

            <Link to='/products'
                onClick={onClose}
            >
                <Button
                    w='100%'
                    bg='ShopTeal.200'
                    mt={1}
                    _hover={{
                        bg: 'ShopTeal.100',
                    }}
                >
                    All Products
                </Button>
            </Link>

            <Link to='/about'
                onClick={onClose}
            >
                <Button
                    w='100%'
                    bg='ShopTeal.200'
                    mt={1}
                    _hover={{
                        bg: 'ShopTeal.100',
                    }}
                >
                    About Us
                </Button>
            </Link>

            <Link to='/contact'
                onClick={onClose}
            >
                <Button
                    w='100%'
                    bg='ShopTeal.200'
                    mt={1}
                    _hover={{
                        bg: 'ShopTeal.100',
                    }}
                >
                    Contact
                </Button>
            </Link>
        </Flex>
    )
}

SidebarContent.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default SidebarContent