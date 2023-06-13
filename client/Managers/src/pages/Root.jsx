import { Outlet } from "react-router-dom";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import { HStack, background } from "@chakra-ui/react";

function Root() {
  return (
    <>
      <HStack>
        <Sidebar />
        <div style={{ width: "100%", height: "100vh" }}>
          <Outlet />
        </div>
      </HStack>
    </>
  );
}

export default Root;
