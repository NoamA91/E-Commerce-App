import { Outlet } from "react-router-dom";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

function Root() {
  const isBaseBreakpoint = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isBaseBreakpoint ? 'column' : 'row'} h='100vh'>
      <Sidebar />
      <Box
        backgroundColor='tomato'
        w='100vw'
        h='100vh'
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

export default Root;
