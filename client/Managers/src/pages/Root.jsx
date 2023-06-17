import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sections/Sidebar/Sidebar';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';

function Root() {
  const { isAuthenticated } = useContext(AuthContext.AuthContext);
  const isBaseBreakpoint = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isBaseBreakpoint ? 'column' : 'row'} h='100vh'>

      {isAuthenticated && <Sidebar />}
      <Box
        bgGradient="linear(to-b, blue.400, #c8e6c9)"
        w='100vw'
        h='100vh'
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Root;
