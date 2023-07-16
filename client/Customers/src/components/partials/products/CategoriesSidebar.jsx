import { useBreakpointValue, Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import React, { useState } from 'react';

const CategoriesSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = React.useRef();
    const onClose = () => setIsOpen(false);

    const layout = useBreakpointValue({ base: 'drawer', md: 'sidebar' });

    return (
        <>
            {layout === 'drawer' && (
                <>
                    <Button ref={btnRef} colorScheme="teal" onClick={() => setIsOpen(true)}>
                        Open
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            {/* Categories */}
                            <p>Category 1</p>
                            <p>Category 2</p>
                            <p>Category 3</p>
                        </DrawerContent>
                    </Drawer>
                </>
            )}
            {layout === 'sidebar' && (
                <Box w='20%' bg='blackAlpha.800'>
                    {/* Categories Sidebar */}
                    <p>Category 1</p>
                    <p>Category 2</p>
                    <p>Category 3</p>
                </Box>
            )}
        </>
    )
}

export default CategoriesSidebar;


// import { Box } from "@chakra-ui/react"
// import { useBreakpointValue } from '@chakra-ui/react'

// const isBaseBreakPoint = useBreakpointValue({
//     base: true,
//     md: false
// })

// const CategoriesSidebar = () => {
//     return (
//         <>
//         {isBaseBreakPoint?(
//             <Box w='20%' bg='blackAlpha.800'>
//             {/* Categories Sidebar */}
//             <p>Category 1</p>
//             <p>Category 2</p>
//             <p>Category 3</p>
//         </Box>
//             ):(
//                 <Box w='20%' bg='blackAlpha.800'>
//                 {/* Categories Sidebar */}
//                 <p>Category 1</p>
//                 <p>Category 2</p>
//                 <p>Category 3</p>
//             </Box>
//             )}
//         </>
//     )
// }

// export default CategoriesSidebar
