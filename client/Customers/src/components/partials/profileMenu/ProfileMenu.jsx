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
    AvatarGroup

} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg"
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from 'react'
import { AiOutlineUser } from 'react-icons/ai'


const ProfileMenu = () => {
    const { user } = useContext(AuthContext)

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
            // rightIcon={

            //     <CgProfile size={30} />

            // }
            >


                <Text
                    fontSize={{ md: 'sm', lg: 'lg' }}
                    fontWeight='bold'
                >
                    {user.username}
                    <Avatar
                        bg='teal.500'
                        size={{ base: 'xs', md: 'sm' }}
                    />
                </Text>
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu >
    )
}

export default ProfileMenu