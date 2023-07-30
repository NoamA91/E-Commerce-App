import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Text,
    Badge,
    Avatar,
    AvatarGroup,
    AvatarBadge,
    Stack,
    HStack,
    chakra,
    Divider

} from '@chakra-ui/react'
import { FaUser } from "react-icons/fa"
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import { AiOutlineUser } from 'react-icons/ai'


const ProfileMenu = () => {
    const { user } = useContext(AuthContext)
    const CFaUser = chakra(FaUser)

    return (
        <Menu>
            <MenuButton
                as={Button}
                size={{ base: 'sm', md: 'md', lg: 'lg' }}
                color='ShopTeal.200'
                _hover={{
                    bgGradient: 'linear(to-b, ShopTeal.300, ShopTeal.100)',
                    color: 'blackAlpha.900',
                }}
            >

                <HStack>
                    <Text
                        fontSize={{ md: 'sm', lg: 'lg' }}
                        fontWeight='bold'
                    >
                        {user.username}
                    </Text>
                    <Stack position='relative'>
                        <CFaUser boxSize={{ base: 5, md: 6 }} />
                        <Badge
                            position='absolute'
                            borderRadius="full"
                            bottom='-1'
                            left={{ base: '3', md: '4' }}
                            colorScheme='yellow'
                            boxSize={{ base: '1.2em', md: '1em' }}
                            border="3px solid"
                            borderColor='blackAlpha.900'
                        />
                    </Stack>
                </HStack>

            </MenuButton>
            <MenuList
                borderColor='blackAlpha.600'
            >
                <MenuItem
                >
                    Profile
                </MenuItem>

                <MenuItem
                >
                    Orders
                </MenuItem>

                <Divider />

                <MenuItem
                    color='red.500'
                >
                    Logout
                </MenuItem>
            </MenuList>
        </Menu >
    )
}

export default ProfileMenu