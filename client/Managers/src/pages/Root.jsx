import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sections/Sidebar/Sidebar';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';

function Root() {
  const { isAuthenticated } = useContext(AuthContext.AuthContext);
  const isBaseBreakpoint = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isBaseBreakpoint ? 'column' : 'row'}>

      {isAuthenticated && <Sidebar />}
      <Box
        bg="gray.200"
        w='100vw'
        h='100%'
        p={isBaseBreakpoint ? '0' : '0'}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Root;
